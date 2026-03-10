import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 rounded-lg" />
          <Skeleton className="h-5 w-48 rounded-lg" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-40 rounded-xl" />
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <Card className="border-none shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden bg-white/80">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Skeleton className="h-10 w-[300px] rounded-xl" />
        </div>
        <div className="p-0">
          <div className="flex flex-col">
            {/* Table Header Skeleton */}
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-slate-100 bg-slate-50/50">
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md justify-self-end" />
            </div>
            
            {/* Table Rows Skeleton */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-4 gap-4 p-5 border-b border-slate-50 items-center">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-5 w-32 rounded-md" />
                </div>
                <Skeleton className="h-5 w-48 rounded-md" />
                <Skeleton className="h-5 w-12 rounded-md" />
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 flex justify-center bg-slate-50/30">
           <div className="flex items-center gap-2 text-primary font-medium">
             <Loader2 className="h-5 w-5 animate-spin" />
             Loading workspace...
           </div>
        </div>
      </Card>
    </div>
  );
}
