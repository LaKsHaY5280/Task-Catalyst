import * as z from "zod";

// ============================================================
// TODOS
// ============================================================

// ============================== TODO SCHEMA
export const todoSchema = z.object({
  title: z.string().min(3).max(500),
  desc: z.string().max(99999).optional(),
  tags: z.string().max(50).optional(),
  dueDate: z.date().optional(),
  creator: z.string().optional(),
});
