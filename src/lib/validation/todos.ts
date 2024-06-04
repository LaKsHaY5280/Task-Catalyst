import * as z from "zod";

// ============================================================
// TODOS
// ============================================================

export const todoSchema = z.object({
  title: z.string().min(3).max(100),
  desc: z.string().max(99999).optional(),
  tags: z.string().max(50).optional(),
  dueDate: z.date().optional(),
  creator: z.string().optional(),
});