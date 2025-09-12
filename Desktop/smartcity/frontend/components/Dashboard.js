export default function DashboardCard({ title, value }) {
  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600 mt-2">{value}</p>
    </div>
  );
}
