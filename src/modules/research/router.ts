import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ResearchRequestSchema } from "./schema.js";
import { researchQueue } from "../../utils/queue.js";
import { prisma } from "../../utils/prisma.js";

export const researchRouter = new Hono()
  .get("/:id/result", async (c) => {
    const researchJobId: string = c.req.param("id");
    const researchData = await prisma.researchJobResult.findFirst({
      where: {
        researchJobId,
      },
    });

    return c.json({
      message: "OK",
      data: researchData,
    });
  })

  .get("/", async (c) => {
    const researchData = await prisma.researchJob.findMany();

    return c.json({
      message: "OK",
      data: researchData,
    });
  })

  .post("/", zValidator("json", ResearchRequestSchema), async (c) => {
    const body = c.req.valid("json");

    const newResearch = await prisma.researchJob.create({
      data: {
        jobTitle: body.jobTitle,
        industry: body.industry,
        jobLevel: body.jobLevel,
        additionalInfo: body.additionalInfo,
      },
    });

    await researchQueue.add("research", newResearch);

    return c.json({ message: "Processing your request", data: body });
  });
