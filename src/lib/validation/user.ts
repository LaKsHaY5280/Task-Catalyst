import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const authFormSchema = (type: string) =>
  z.object({
    name:
      type === "Login"
        ? z.string().optional()
        : z.string().min(2, { message: "Name must be at least 2 characters." }),
    username:
      type === "Login"
        ? z.string().optional()
        : z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  });
