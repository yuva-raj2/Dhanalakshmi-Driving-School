const payments = [
  {
    id: 1,
    student: "Ravi Kumar",
    amount: 5000,
    status: "Paid",
  },
  {
    id: 2,
    student: "Manikandan",
    amount: 7000,
    status: "Paid",
  },
];

export default function PaymentTable() {
  return (
    <div className="glass-card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-4 text-left">
              Student
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="p-4">
                {payment.student}
              </td>

              <td className="p-4">
                ₹{payment.amount}
              </td>

              <td className="p-4">
                {payment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}