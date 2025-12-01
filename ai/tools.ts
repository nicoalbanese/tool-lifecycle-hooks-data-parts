import { tool } from "ai";
import { z } from "zod";
import { getLocation } from "./utils";

export const tools = {
  weather: tool({
    description: "Get the weather in a location",
    inputSchema: z.object({
      locationId: z.string().describe("The location to get the weather for"),
    }),
    needsApproval: true,
    execute: async ({ locationId }) => {
      const location = await getLocation(locationId);
      return {
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      };
    },
  }),
};
