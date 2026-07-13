import { createCompletion } from "@anvia/core";
import { getAIClient } from "../../utils/ai-config.js";

export async function generateTravelPlan(
  context: string,
  instructions: string,
) {
  const aiClient = getAIClient();
  const model = aiClient.completionModel("mimo-v2.5-pro");

  const response = await createCompletion(model, {
    input: context,
    instructions,
    maxTokens: 3000,
  });

  return response.text;
}
