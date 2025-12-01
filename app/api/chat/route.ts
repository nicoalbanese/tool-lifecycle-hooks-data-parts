import { MyUIMessage } from "@/ai/types";
import { tools } from "@/ai/tools";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: MyUIMessage[] } = await req.json();

  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      const result = streamText({
        model: "openai/gpt-4o-mini",
        messages: convertToModelMessages(messages),
        tools: tools(writer),
        stopWhen: stepCountIs(5),
      });
      writer.merge(result.toUIMessageStream());
    },
    originalMessages: messages,
  });

  return createUIMessageStreamResponse({ stream });
}
