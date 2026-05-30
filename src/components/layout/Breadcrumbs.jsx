import { useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  const segments = location.pathname
    .split("/")
    .filter(Boolean);

  return (
    <div className="text-sm text-gray-400">
      {segments.join(" / ")}
    </div>
  );
}