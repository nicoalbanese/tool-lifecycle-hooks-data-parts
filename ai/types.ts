import { InferUITools, UIDataTypes, UIMessage } from "ai";
import { tools } from "./tools";

export type MyUIMessage = UIMessage<
  never,
  UIDataTypes,
  InferUITools<typeof tools>
>;
