import { randomBytes } from "crypto";
export const generateRandomPassword = () => {
  const length = Math.floor(Math.random() * 9) + 8;
  const password = randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
  console.log(password);
  return password;
};
