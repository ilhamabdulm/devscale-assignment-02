import { Queue } from "bullmq";
import { connection, RESEARCH_QUEUE_NAME } from "./queue-config.js";

export const researchQueue = new Queue(RESEARCH_QUEUE_NAME, { connection });
