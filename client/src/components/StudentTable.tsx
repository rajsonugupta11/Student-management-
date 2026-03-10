import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Student } from "@shared/schema";
import { Pencil, Trash2, UserCircle, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  selectedIds: Set<string>;
  onToggleSelect: (id: string, checked: boolean) => void;
  onToggleSelectAll: (checked: boolean) => void;
  onAddFirst: () => void;
}

export function StudentTable({ 
  students, 
  onEdit, 
  onDelete, 
  selectedIds, 
  onToggleSelect, 
  onToggleSelectAll,
  onAddFirst
}: StudentTableProps) {
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const confirmDelete = () => {
    if (studentToDelete) {
      onDelete(studentToDelete.id);
      setStudentToDelete(null);
    }
  };

  const allSelected = students.length > 0 && students.every(s => selectedIds.has(s.id));
  const someSelected = students.some(s => selectedIds.has(s.id)) && !allSelected;

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-sm font-semibold text-slate-500 uppercase tracking-wider">
              <th className="p-4 pl-6 w-12">
                <Checkbox 
                  checked={allSelected || (someSelected ? "indeterminate" : false)}
                  onCheckedChange={onToggleSelectAll}
                  aria-label="Select all students"
                />
              </th>
              <th className="p-4 font-display">Student Name</th>
              <th className="p-4 font-display">Email Address</th>
              <th className="p-4 font-display">Age</th>
              <th className="p-4 pr-6 text-right font-display">Edit/Delite</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence mode="popLayout">
              {students.length > 0 ? (
                students.map((student, index) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    key={student.id}
                    className={`group transition-colors duration-200 ${
                      selectedIds.has(student.id) 
                        ? 'bg-primary/5' 
                        : 'hover:bg-slate-50 even:bg-slate-50/30'
                    }`}
                  >
                    <td className="p-4 pl-6">
                      <Checkbox 
                        checked={selectedIds.has(student.id)}
                        onCheckedChange={(checked) => onToggleSelect(student.id, !!checked)}
                        aria-label={`Select ${student.name}`}
                      />
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-display shadow-sm">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-800">{student.name}</span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap text-slate-600">
                      {student.email}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
                        {student.age} yrs
                      </span>
                    </td>
                    <td className="p-4 pr-6 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onEdit(student)}
                          className="h-9 w-9 text-slate-600 hover:text-primary hover:border-primary/30 hover:bg-primary/5 rounded-xl transition-all shadow-sm"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setStudentToDelete(student)}
                          className="h-9 w-9 text-slate-600 hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 rounded-xl transition-all shadow-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={5} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                        <UserCircle className="h-10 w-10 text-slate-300" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No students found</h3>
                      <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                        Your directory is currently empty. Get started by adding your first student record.
                      </p>
                      <Button onClick={onAddFirst} className="rounded-xl px-8 h-12 shadow-lg shadow-primary/20">
                        <Plus className="mr-2 h-5 w-5" />
                        Add Your First Student
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!studentToDelete} onOpenChange={() => setStudentToDelete(null)}>
        <AlertDialogContent className="rounded-3xl shadow-2xl border-none max-w-md">
          <AlertDialogHeader>
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6 mx-auto">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <AlertDialogTitle className="font-display text-2xl text-center">Delete Student?</AlertDialogTitle>
            <AlertDialogDescription className="text-base text-center px-4">
              Are you sure you want to delete <strong>{studentToDelete?.name}</strong>? This will permanently remove their record from the directory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 flex-col sm:flex-row gap-3">
            <AlertDialogCancel className="rounded-2xl h-12 px-8 m-0 border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold flex-1">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="rounded-2xl h-12 px-8 m-0 bg-destructive text-destructive-foreground shadow-lg shadow-destructive/25 hover:bg-destructive/90 hover:shadow-xl hover:shadow-destructive/30 hover:-translate-y-0.5 transition-all font-semibold flex-1"
            >
              Delete Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
