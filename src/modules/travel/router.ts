import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { TravelPlanSchema } from "./schema.js";
import { travelQueue } from "../../utils/queue.js";
import { prisma } from "../../utils/prisma.js";

export const travelRouter = new Hono()
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const data = await prisma.travelRecommendation.findUnique({
      where: { id },
    });

    return c.json({
      message: "OK",
      data: data,
    });
  })
  .get("/", async (c) => {
    const data = await prisma.travelRecommendation.findMany();

    return c.json({
      message: "OK",
      data: data,
    });
  })
  .post("/", zValidator("json", TravelPlanSchema), async (c) => {
    const body = c.req.valid("json");

    const travelData = await prisma.travelRecommendation.create({
      data: {
        ...body,
      },
    });

    await travelQueue.add("travel", travelData);

    return c.json({ message: "Processing your request", data: body });
  });
