import AttendanceGrid from "../../components/attendance/AttendanceGrid";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        Attendance
      </h1>

      <AttendanceGrid />
    </div>
  );
}