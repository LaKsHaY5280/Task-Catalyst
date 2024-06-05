import * as z from "zod";

// ============================================================
// USER
// ============================================================


// ============================== AUHTFORM SCHEMA
export const authFormSchema = (type: string) =>
  z.object({
    fname:
      type === "Login"
        ? z.string().optional()
        : z.string().min(2, { message: "Name must be at least 2 characters." }),
    lname:
      type === "Login"
        ? z.string().optional()
        : z.string().min(1, { message: "Name must be at least 1 character." }),
    username:
      type === "Login"
        ? z.string().optional()
        : z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  });

// ============================== PROFILE SCHEMA
export const profileSchema = z.object({
  imageUrl: z.string().url().optional(),
  fname: z.string().min(2, { message: "Name must be at least 2 characters." }),
  lname: z.string().min(1, { message: "Name must be at least 1 character." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  bio: z.string().optional(),
  course: z.string().optional(),
  year: z.number().optional(),
  semester: z.number().optional(),
  section: z.string().optional(),
  // timetable: z.record(z.array(z.string())),
  // syllabus: z.string(),
  // datesheet: z.string(),
  // recentTodos: z.string(),
  // notes: z.string(),
});