import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-5">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <Link
          to="/students"
          className="p-4 rounded-xl bg-primary text-center"
        >
          Add Student
        </Link>

        <Link
          to="/payments"
          className="p-4 rounded-xl bg-secondary text-center"
        >
          Record Payment
        </Link>

        <Link
          to="/attendance"
          className="p-4 rounded-xl bg-green-600 text-center"
        >
          Mark Attendance
        </Link>
      </div>
    </div>
  );
}