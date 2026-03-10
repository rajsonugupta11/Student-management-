import { z } from "zod";

// We define our student schema to be used by React Hook Form
export const studentSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  age: z.coerce.number().min(1, "Age must be a positive number"),
});

export type Student = z.infer<typeof studentSchema>;
export type InsertStudent = Omit<Student, "id">;
