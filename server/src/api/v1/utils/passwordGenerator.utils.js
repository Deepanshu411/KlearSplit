// export const generateRandomPassword = (length = 8) => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let password = '';

//     // Ensure the password is at least 8 characters long
//     if (length < 8) {
//         length = 8;
//     }

//     // Generate the random password
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * chars.length);
//         password += chars[randomIndex];
//     }

//     return password;
// }
import { randomBytes } from "crypto";
export const generateRandomPassword = () => {
  const length = Math.floor(Math.random() * 9) + 8;
  const password = randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
  return password;
};
