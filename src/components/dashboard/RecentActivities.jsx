const activities = [
  "New student registered",
  "Payment received ₹5000",
  "Attendance marked",
  "Vehicle assigned",
  "Course completed",
];

export default function RecentActivities() {
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4">
        Recent Activities
      </h2>

      <div className="space-y-4">
        {activities.map(
          (activity, index) => (
            <div
              key={index}
              className="border-b border-white/10 pb-3"
            >
              {activity}
            </div>
          )
        )}
      </div>
    </div>
  );
}