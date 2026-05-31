import { Search } from "lucide-react";

export default function StudentFilters({
  search,
  setSearch,
}) {
  return (
    <div className="glass-card p-4">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search students..."
          className="w-full pl-10 p-3 rounded-xl bg-black/20 border border-white/10"
        />
      </div>
    </div>
  );
}