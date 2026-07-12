import { createCompletion } from "@anvia/core";
import { getAIClient } from "../../utils/ai-config.js";

const GENERATE_PERSPECTIVE_PROMPT = `
You are an expert of analyzing perspective for a job in terms of AI Replacement

<output_format>
RISK:
- Explain (max 3 point) as points is this job will be replaced by AI or no in the future

WHAT TO DO:
- Explain (max 3 point) on how to avoid from this job being replaced by AI

ACTIONABLE STEPS:
- Explain (max 3 point) on how to avoid this from happening, be specific and actionable

SUMMARY:
- Explain (max 1 point) in 1 sentences the summary of this analysis
</output_format>
`;

export async function generatePerspective(
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
