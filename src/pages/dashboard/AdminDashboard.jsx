import KPIGrid from "../../components/dashboard/KPIGrid";
import QuickActions from "../../components/dashboard/QuickActions";
import RevenueChart from "../../components/dashboard/RevenueChart";
import AttendanceOverview from "../../components/dashboard/AttendanceOverview";
import StudentProgress from "../../components/dashboard/StudentProgress";
import RecentActivities from "../../components/dashboard/RecentActivities";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back Admin
        </p>
      </div>

      <KPIGrid />

      <div className="grid xl:grid-cols-2 gap-6">
        <RevenueChart />
        <AttendanceOverview />
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <StudentProgress />
        <RecentActivities />
      </div>

      <QuickActions />
    </div>
  );
}