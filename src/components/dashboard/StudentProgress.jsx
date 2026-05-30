import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Completed",
    value: 65,
  },
  {
    name: "In Progress",
    value: 25,
  },
  {
    name: "New",
    value: 10,
  },
];

const COLORS = [
  "#4F46E5",
  "#22C55E",
  "#F59E0B",
];

export default function StudentProgress() {
  return (
    <div className="glass-card p-6 h-[350px]">
      <h2 className="text-xl font-bold mb-4">
        Student Progress
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={90}
          >
            {data.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}