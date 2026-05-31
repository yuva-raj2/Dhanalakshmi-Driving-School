import NotificationSettings from "../../components/settings/NotificationSettings";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        Settings
      </h1>

      <NotificationSettings />
    </div>
  );
}