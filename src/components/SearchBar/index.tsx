import { useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    onSearch(event.target.value);
  }

  return (
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="p-2 rounded-3xl shadow-sm border-gray-500 dark:border-gray-700 dark:bg-slate-700 dark:text-white border-2"
      />
  );
}
