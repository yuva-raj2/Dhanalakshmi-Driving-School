import PaymentTable from "../../components/payments/PaymentTable";

export default function PaymentHistoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        Payments
      </h1>

      <PaymentTable />
    </div>
  );
}