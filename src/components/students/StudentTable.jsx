import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentTable({
  students,
}) {
  return (
    <div className="glass-card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Course
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-b border-white/5"
            >
              <td className="p-4">
                {student.name}
              </td>

              <td className="p-4">
                {student.phone}
              </td>

              <td className="p-4">
                {student.course}
              </td>

              <td className="p-4">
                <span className="px-3 py-1 rounded-full bg-green-500/20">
                  {student.status}
                </span>
              </td>

              <td className="p-4">
                <Link
                  to={`/students/${student.id}`}
                >
                  <Eye size={18} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}