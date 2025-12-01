import { tool, UIMessage, UIMessageStreamWriter } from "ai";
import { z } from "zod";
import { getLocation, locationMap } from "./utils";
import { MyDataTypes } from "./types";

export const tools = (
  writer: UIMessageStreamWriter<UIMessage<never, MyDataTypes>>,
) => ({
  weather: tool({
    description: "Get the weather in a location.",
    inputSchema: z.object({
      locationId: z
        .string()
        .describe(
          "The id for the location to get the weather for. Possible IDs: " +
            JSON.stringify(locationMap),
        ),
    }),
    needsApproval: true,
    onInputAvailable: async ({ toolCallId, input }) => {
      writer.write({
        type: "data-weatherToolMetadata",
        data: {
          location: await getLocation(input.locationId),
          toolCallId,
        },
      });
    },
    execute: async ({ locationId }) => {
      const location = await getLocation(locationId);
      return {
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      };
    },
  }),
});
