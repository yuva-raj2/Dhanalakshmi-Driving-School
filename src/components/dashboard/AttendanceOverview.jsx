const attendance = [
  95, 88, 92, 80, 98, 91, 87,
  94, 89, 97, 83, 85, 93, 99,
];

export default function AttendanceOverview() {
  return (
    <div className="glass-card p-6 h-[350px]">
      <h2 className="text-xl font-bold mb-6">
        Attendance Overview
      </h2>

      <div className="grid grid-cols-7 gap-2">
        {attendance.map(
          (value, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg flex items-center justify-center text-xs font-medium"
              style={{
                backgroundColor:
                  value > 95
                    ? "#22C55E"
                    : value > 85
                    ? "#4F46E5"
                    : "#F59E0B",
              }}
            >
              {value}
            </div>
          )
        )}
      </div>

      <div className="mt-8">
        <div className="text-4xl font-bold">
          91%
        </div>

        <div className="text-gray-400">
          Average Attendance
        </div>
      </div>
    </div>
  );
}