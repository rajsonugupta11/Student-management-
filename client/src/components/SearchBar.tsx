import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group w-full sm:w-[350px]">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
        <Search className="h-4 w-4" />
      </div>
      <Input
        type="text"
        placeholder="Search students by name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-11 h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm"
      />
    </div>
  );
}
