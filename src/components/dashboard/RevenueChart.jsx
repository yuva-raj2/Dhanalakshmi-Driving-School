import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 65000 },
  { month: "Mar", revenue: 58000 },
  { month: "Apr", revenue: 92000 },
  { month: "May", revenue: 76000 },
  { month: "Jun", revenue: 120000 },
];

export default function RevenueChart() {
  return (
    <div className="glass-card p-6 h-[350px]">
      <h2 className="text-xl font-bold mb-4">
        Revenue Overview
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient
              id="revenue"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#4F46E5"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#4F46E5"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />
          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#4F46E5"
            fill="url(#revenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}