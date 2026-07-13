import { OpenAIClient } from "@anvia/openai";
import { tavily } from "@tavily/core";

const BASE_URL = "https://opencode.ai/zen/go/v1";
const API_KEY = process.env.OPENCODE_API_KEY;

interface AI_CLIENT_OPTIONS {
  apiKey?: string;
  baseUrl?: string;
}

export function getAIClient(options?: AI_CLIENT_OPTIONS) {
  return new OpenAIClient({
    baseUrl: options?.baseUrl ?? BASE_URL,
    apiKey: options?.apiKey ?? API_KEY,
  });
}

export const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY! });
