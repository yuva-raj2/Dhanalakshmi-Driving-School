import {
  Users,
  CreditCard,
  Truck,
  Calendar,
} from "lucide-react";

import StatCard from "./StatCard";

export default function KPIGrid() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        title="Total Students"
        value="1,250"
        icon={Users}
        color="bg-blue-600/20"
      />

      <StatCard
        title="Monthly Revenue"
        value="₹2.4L"
        icon={CreditCard}
        color="bg-green-600/20"
      />

      <StatCard
        title="Vehicles"
        value="25"
        icon={Truck}
        color="bg-purple-600/20"
      />

      <StatCard
        title="Today's Sessions"
        value="18"
        icon={Calendar}
        color="bg-orange-600/20"
      />
    </div>
  );
}