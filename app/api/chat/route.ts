import { type CoreMessage, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const llm = createOpenAI({ baseURL: "http://localhost:1234/v1" });
  const model = llm("LM Studio Community/Meta-Llama-3-8B-Instruct-GGUF");

  const result = await streamText({
    model,
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toAIStreamResponse();
}
