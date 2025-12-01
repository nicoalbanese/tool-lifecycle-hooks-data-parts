import { MyUIMessage } from "@/ai/types";
import { tools } from "@/ai/tools";
import { convertToModelMessages, stepCountIs, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: MyUIMessage[] } = await req.json();

  const result = streamText({
    model: "openai/gpt-4o-mini",
    messages: convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
