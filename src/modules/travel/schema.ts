import z from "zod";

export const TravelPlanSchema = z.object({
  destination_city: z.string().min(1),
  est_budget: z.string().min(1),
  trip_duration: z.string().min(1),
  travel_date: z.string().min(1),
  additionalInfo: z.string().optional(),
});
