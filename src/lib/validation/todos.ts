import * as z from "zod";

// ============================================================
// TODOS
// ============================================================

// ============================== TODO SCHEMA
export const todoSchema = z.object({
  title: z.string().min(3).max(500),
  desc: z.string().max(99999).optional(),
  tags: z.string().max(500).optional(),
  dueDate: z.date().optional(),
  creator: z.string().optional(),
});

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;