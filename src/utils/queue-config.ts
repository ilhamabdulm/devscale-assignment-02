import type { ConnectionOptions } from "bullmq";

export const connection: ConnectionOptions = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  db: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB) : 0,
  //   maxRetriesPerRequest: null,
  //   enableReadyCheck: false,
  //   enableOfflineQueue: false,
};

export const RESEARCH_QUEUE_NAME = "RESEARRCH_QUEUE";
export const TRAVEL_QUEUE_NAME = "TRAVEL_PLAN_QUEUE";
