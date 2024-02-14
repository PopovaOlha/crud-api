export const isBodyDataValid = (
    username: string,
    age: number,
    hobbies: string[],
  ): boolean => {
    const isValidUsername = typeof username === "string" && username.trim() !== "";
    const isValidAge = typeof age === "number" && age > 0;
    const areValidHobbies =
      Array.isArray(hobbies) &&
      hobbies.every((hobby) => typeof hobby === "string" && hobby.trim() !== "");
  
    return isValidUsername && isValidAge && areValidHobbies;
  };
  