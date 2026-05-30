import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
  return (
    <header className="h-20 border-b border-white/10 flex items-center justify-between px-6">
      <Breadcrumbs />

      <div className="flex items-center gap-4">
        <span>Admin</span>
      </div>
    </header>
  );
}