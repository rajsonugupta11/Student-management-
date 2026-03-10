import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, type Student, type InsertStudent } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { User, Mail, Hash } from "lucide-react";

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InsertStudent) => void;
  initialData?: Student | null;
}

export function StudentForm({ isOpen, onClose, onSubmit, initialData }: StudentFormProps) {
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InsertStudent>({
    resolver: zodResolver(studentSchema.omit({ id: true })),
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
    },
  });

  // Reset form when dialog opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name,
          email: initialData.email,
          age: initialData.age,
        });
      } else {
        reset({
          name: "",
          email: "",
          age: undefined,
        });
      }
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data: InsertStudent) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="bg-primary p-6 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-display">
              {isEditing ? "Edit Student" : "Add New Student"}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80 mt-1">
              {isEditing
                ? "Update the student's information below."
                : "Enter the details for the new student."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10 h-12 rounded-xl"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive font-medium animate-in slide-in-from-top-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-10 h-12 rounded-xl"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive font-medium animate-in slide-in-from-top-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-semibold">Age</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="age"
                  type="number"
                  placeholder="21"
                  className="pl-10 h-12 rounded-xl"
                  {...register("age", { valueAsNumber: true })}
                />
              </div>
              {errors.age && (
                <p className="text-sm text-destructive font-medium animate-in slide-in-from-top-1">
                  {errors.age.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-11 px-6 font-semibold border-slate-200 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl h-11 px-6 font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
            >
              {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Add Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
