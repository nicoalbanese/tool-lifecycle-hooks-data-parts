import { tools } from "@/ai/tools";
import { UIToolInvocation } from "ai";

interface WeatherToolViewProps {
  invocation: UIToolInvocation<(typeof tools)["weather"]>;
  addToolApprovalResponse: (response: {
    id: string;
    approved: boolean;
  }) => void;
}

export function WeatherToolView({
  invocation,
  addToolApprovalResponse,
}: WeatherToolViewProps) {
  if (invocation.state === "approval-requested") {
    return (
      <div className="border border-zinc-300 rounded p-4 space-y-2">
        <p className="text-sm">
          Can I retrieve the weather for location ID:{" "}
          {invocation.input.locationId}?
        </p>
        <div className="flex gap-2">
          <button
            onClick={() =>
              addToolApprovalResponse({
                id: invocation.approval.id,
                approved: true,
              })
            }
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
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
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Deny
          </button>
        </div>
      </div>
    );
  }

  if (invocation.state === "output-available") {
    return (
      <div className="border border-zinc-300 rounded p-4 space-y-1">
        <div className="text-sm">
          <strong>Weather:</strong> {invocation.output.location}
        </div>
        <div className="text-sm">
          <strong>Temperature:</strong> {invocation.output.temperature}°F
        </div>
      </div>
    );
  }

  if (invocation.state === "input-available") {
    return (
      <div className="border border-zinc-300 rounded p-4">
        <div className="text-sm text-zinc-500">
          Fetching weather for location ID: {invocation.input.locationId}...
        </div>
      </div>
    );
  }

  return null;
}
