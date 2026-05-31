export default function NotificationSettings() {
  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-6">
        Notification Preferences
      </h2>

      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <span>Email Notifications</span>

          <input
            type="checkbox"
            defaultChecked
          />
        </label>

        <label className="flex items-center justify-between">
          <span>SMS Notifications</span>

          <input
            type="checkbox"
          />
        </label>

        <label className="flex items-center justify-between">
          <span>WhatsApp Alerts</span>

          <input
            type="checkbox"
            defaultChecked
          />
        </label>
      </div>
    </div>
  );
}