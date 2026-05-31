const days = Array.from(
  { length: 30 },
  (_, index) => index + 1
);

export default function AttendanceGrid() {
  return (
    <div className="glass-card p-6">
      <div className="grid grid-cols-7 gap-3">
        {days.map((day) => (
          <div
            key={day}
            className="aspect-square rounded-lg bg-primary/20 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}