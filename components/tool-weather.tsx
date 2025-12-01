import { tools } from "@/ai/tools";
import { MyDataTypes } from "@/ai/types";
import { DataUIPart, UIToolInvocation } from "ai";

interface WeatherToolViewProps {
  invocation: UIToolInvocation<ReturnType<typeof tools>["weather"]>;
  addToolApprovalResponse: (response: {
    id: string;
    approved: boolean;
  }) => void;
  metadata?: DataUIPart<MyDataTypes> & { type: "data-weatherToolMetadata" };
}

export function WeatherToolView({
  invocation,
  addToolApprovalResponse,
  metadata,
}: WeatherToolViewProps) {
  if (invocation.state === "approval-requested") {
    return (
      <div className="border border-zinc-300 dark:border-zinc-700 rounded p-4 space-y-2 bg-zinc-50 dark:bg-zinc-900">
        <pre className="text-xs text-zinc-700 dark:text-zinc-300 overflow-auto">
          {JSON.stringify(metadata, null, 2)}
        </pre>

        <p className="text-sm text-zinc-800 dark:text-zinc-200">
          Can I retrieve the weather for location ID:{" "}
          {invocation.input.locationId} ({metadata?.data.location})?
        </p>
        <div className="flex gap-2">
          <button
            onClick={() =>
              addToolApprovalResponse({
                id: invocation.approval.id,
                approved: true,
              })
            }
            className="px-3 py-1 bg-green-600 dark:bg-green-700 text-white rounded hover:bg-green-700 dark:hover:bg-green-800"
          >
            Approve
          </button>
          <button
            onClick={() =>
              addToolApprovalResponse({
                id: invocation.approval.id,
                approved: false,
              })
            }
            className="px-3 py-1 bg-red-600 dark:bg-red-700 text-white rounded hover:bg-red-700 dark:hover:bg-red-800"
          >
            Deny
          </button>
        </div>
      </div>
    );
  }

  if (invocation.state === "output-available") {
    return (
      <div className="border border-zinc-300 dark:border-zinc-700 rounded p-4 space-y-1 bg-zinc-50 dark:bg-zinc-900">
        <div className="text-sm text-zinc-800 dark:text-zinc-200">
          <strong className="text-zinc-900 dark:text-zinc-100">Weather:</strong>{" "}
          {invocation.output.location}
        </div>
        <div className="text-sm text-zinc-800 dark:text-zinc-200">
          <strong className="text-zinc-900 dark:text-zinc-100">
            Temperature:
          </strong>{" "}
          {invocation.output.temperature}°F
        </div>
      </div>
    );
  }

  if (invocation.state === "input-available") {
    return (
      <div className="border border-zinc-300 dark:border-zinc-700 rounded p-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          Fetching weather for location ID: {invocation.input.locationId}...
        </div>
      </div>
    );
  }

  return null;
}
