"use client";

import { useChat } from "@ai-sdk/react";
import {
  getToolName,
  isToolUIPart,
  lastAssistantMessageIsCompleteWithApprovalResponses,
} from "ai";
import { useState } from "react";
import { WeatherToolView } from "@/components/tool-weather";
import { MyUIMessage } from "@/ai/types";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, error, sendMessage, addToolApprovalResponse } =
    useChat<MyUIMessage>({
      sendAutomaticallyWhen:
        lastAssistantMessageIsCompleteWithApprovalResponses,
    });
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id}>
            <div className="font-bold">{m.role}</div>
            {m.parts.map((p, i) => {
              switch (p.type) {
                case "text":
                  return (
                    <div key={i} className="whitespace-pre-wrap">
                      <div>
                        <p>{p.text}</p>
                      </div>
                    </div>
                  );
                case "tool-weather":
                  return (
                    <div key={i} className="my-2">
                      <WeatherToolView
                        invocation={p}
                        addToolApprovalResponse={addToolApprovalResponse}
                      />
                    </div>
                  );

                default:
                  if (isToolUIPart(p)) {
                    const toolName = getToolName(p);

                    return (
                      <div key={i} className="whitespace-pre-wrap">
                        <div>
                          <div className="text-sm text-zinc-500">
                            Tool call: {toolName}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
              }
            })}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
