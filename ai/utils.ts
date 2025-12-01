export const getLocation = async (id: string) => {
  console.log(id);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return "London";
};
