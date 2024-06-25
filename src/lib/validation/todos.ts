import * as z from "zod";

// ============================================================
// TODOS
// ============================================================

// ============================== TODO SCHEMA
export const todoSchema = z.object({
  title: z.string().min(3).max(500),
  desc: z.string().max(99999).optional(),
  priority: z.string().optional(),
  labels: z.string().optional(),
  tags: z.string().max(500).optional(),
  dueDate: z.date().optional(),
  status: z.string().optional(),
  creator: z.string().optional(),
});

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(500),
  desc: z.string().max(99999).optional(),
  priority: z.string().optional(),
  labels: z.string().optional(),
  tags: z.array(z.string()),
  dueDate: z.date().nullable(),
  status: z.string().optional(),
  creator: z.string().nullable(),
});

export type Task = z.infer<typeof taskSchema>;