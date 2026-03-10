import { useState, useCallback } from "react";
import type { Student, InsertStudent } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Fallback ID generator for frontend-only state
const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Initial mock data to populate the dashboard
const INITIAL_STUDENTS: Student[] = [
  { id: generateId(), name: "Sonu Kumar", email: "rajsonugupta9@gmail.com.com", age: 23 },
  { id: generateId(), name: "Himanshu Singh", email: "himanshuk5@gmail.com.com", age: 22 },
  { id: generateId(), name: "Rohit", email: "Rohit12121@gmail.com", age: 21 },
  { id: generateId(), name: "Prince", email: "Prince@gmail.com", age: 19 },
  { id: generateId(), name: "Raj Kumar Singh", email: "Singh123@gmail.com", age: 24 },
];

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const { toast } = useToast();

  const addStudent = useCallback((data: InsertStudent) => {
    const newStudent: Student = { ...data, id: generateId() };
    setStudents((prev) => [newStudent, ...prev]);
    toast({
      title: "Success",
      description: "Student added successfully.",
    });
  }, [toast]);

  const updateStudent = useCallback((id: string, data: InsertStudent) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...data, id } : student))
    );
    toast({
      title: "Success",
      description: "Student updated successfully.",
    });
  }, [toast]);

  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    toast({
      title: "Deleted",
      description: "Student has been removed from the system.",
      variant: "destructive",
    });
  }, [toast]);

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}
