import { useParams } from "react-router-dom";

export default function StudentDetailPage() {
  const { id } = useParams();

  return (
    <div className="glass-card p-8">
      <h1 className="text-4xl font-bold">
        Student #{id}
      </h1>

      <div className="mt-6 space-y-4">
        <p>
          Name: Ravi Kumar
        </p>

        <p>
          Course: Heavy Vehicle
        </p>

        <p>
          Attendance: 92%
        </p>

        <p>
          Payments: ₹45,000
        </p>
      </div>
    </div>
  );
}