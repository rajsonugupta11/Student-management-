import { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Plus, Download, Users, GraduationCap, ArrowLeft, FileDown, FileSpreadsheet } from "lucide-react";
import type { Student, InsertStudent } from "@shared/schema";

import { useStudents } from "@/hooks/use-students";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { StudentTable } from "@/components/StudentTable";
import { StudentForm } from "@/components/StudentForm";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selection State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Simulate initial API load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const filteredStudents = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  // Excel Export Helpers
  const exportToExcel = (data: Student[], fileName: string) => {
    const exportData = data.map(({ name, email, age }) => ({
      "Full Name": name,
      "Email Address": email,
      "Age": age,
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    
    saveAs(dataBlob, `${fileName}.xlsx`);
  };

  const handleExportSelected = () => {
    const selectedStudents = students.filter(s => selectedIds.has(s.id));
    exportToExcel(selectedStudents, "selected_students");
  };

  const handleExportAll = () => {
    exportToExcel(students, "all_students");
  };

  // Form Handlers
  const openAddForm = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const openEditForm = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: InsertStudent) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, data);
    } else {
      addStudent(data);
    }
  };

  const handleBackToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchQuery("");
  };

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredStudents.map(s => s.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleSelect = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      {/* Top Navigation / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToHome}
              className="hidden lg:flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-semibold text-xs uppercase tracking-wider">Back to Home</span>
            </Button>
            
            <div className="flex items-center gap-3 border-l lg:pl-6 border-slate-100">
              <div className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-display text-slate-900">Student Portal</h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide">Management System</p>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
            <Users className="h-4 w-4" />
            <span>Total Students: {students.length}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold font-display text-slate-900">Directory</h2>
            <p className="text-slate-500 mt-1">Manage and organize student records seamlessly.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-3">
            <div className="flex w-full sm:w-auto gap-2">
              <Button
                variant="outline"
                onClick={handleExportSelected}
                disabled={selectedIds.size === 0}
                className="flex-1 sm:flex-none h-12 rounded-xl border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:text-slate-900 shadow-sm"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Selected Download ({selectedIds.size})
              </Button>
              <Button
                variant="outline"
                onClick={handleExportAll}
                disabled={students.length === 0}
                className="flex-1 sm:flex-none h-12 rounded-xl border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:text-slate-900 shadow-sm"
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
               Download All
              </Button>
            </div>
            <Button
              onClick={openAddForm}
              className="w-full sm:w-auto h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Student
            </Button>
          </div>
        </div>

        <Card className="glass-card border-none rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50">
            <SearchBar value={searchQuery} onChange={(val) => {
              setSearchQuery(val);
              setSelectedIds(new Set()); // Reset selection on search
            }} />
            <div className="text-sm text-slate-500 font-medium w-full sm:w-auto text-right">
              Showing {filteredStudents.length} of {students.length}
            </div>
          </div>
          
          <div className="bg-white">
            <StudentTable
              students={filteredStudents}
              onEdit={openEditForm}
              onDelete={deleteStudent}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onAddFirst={openAddForm}
            />
          </div>
        </Card>
      </main>

      <StudentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingStudent}
      />
    </div>
  );
}
