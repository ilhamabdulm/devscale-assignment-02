import "dotenv/config";

import { Worker } from "bullmq";
import { connection, RESEARCH_QUEUE_NAME } from "./utils/queue-config.js";
import { prisma } from "./utils/prisma.js";
import { generatePerspective } from "./modules/research/services.js";

import {
  getJobReportPrompt,
  getCareerPivotingPrompt,
  getMarketDemandPrompt,
  getMotivationAndConsequencePrompt,
} from "./modules/research/prompts.js";
import { mkdir } from "node:fs/promises";
import { mdToPdf } from "md-to-pdf";

const worker = new Worker(
  RESEARCH_QUEUE_NAME,
  async (job) => {
    console.log("JOB ID", job.id);

    const context = `
    JOB TITLE: ${job.data.jobTitle}
    INDUSTRY: ${job.data.industry}
    JOB LEVEL: ${job.data.jobLevel}
    ADDITIONAL INFO: ${job.data.additionalInfo}
    `;

    const date = new Date().toISOString();

    const prompts = [
      getJobReportPrompt(date),
      getCareerPivotingPrompt(date),
      getMarketDemandPrompt(date),
      getMotivationAndConsequencePrompt(date),
    ];

    let finalResult = "";

    for (const prompt of prompts) {
      console.log("generating for prompt ", prompt.slice(0, 50));
      const response = await generatePerspective(context, prompt);
      finalResult += response + "\n\n";
    }

    console.log(finalResult);

    await mkdir("reports", { recursive: true });

    const filePath = `reports/${job.data.id}.pdf`;

    await mdToPdf({ content: finalResult }, { dest: filePath });

    await prisma.researchJob.update({
      where: {
        id: job.data.id,
      },
      data: {
        isCompleted: true,
      },
    });

    await prisma.researchJobResult.create({
      data: {
        researchJobId: job.data.id,
        context,
        perspective: finalResult,
      },
    });
  },
  { connection },
);

worker.on("error", (err) => {
  console.error("Worker error", err);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed with error:`, err);
});
