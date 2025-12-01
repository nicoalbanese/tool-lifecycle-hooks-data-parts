import { InferUITools, UIMessage } from "ai";
import { tools } from "./tools";

export type MyDataTypes = {
  weatherToolMetadata: {
    toolCallId: string;
    location: string;
  };
};

export type MyUIMessage = UIMessage<
  never,
  MyDataTypes,
  InferUITools<ReturnType<typeof tools>>
>;
