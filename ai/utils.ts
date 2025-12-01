export const getLocation = async (id: string) => {
  console.log(id);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return locationMap[id] ?? "Not found.";
};

export const locationMap: Record<string, string> = {
  "1": "London",
  "2": "New York",
  "3": "Tokyo",
  "4": "Sydney",
  "5": "Paris",
  "6": "Berlin",
  "7": "Rome",
  "8": "Madrid",
  "9": "Moscow",
  "10": "Beijing",
  "11": "San Francisco",
  "12": "Los Angeles",
};
