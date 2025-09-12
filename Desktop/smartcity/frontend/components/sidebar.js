import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4 space-y-4">
      <h2 className="font-bold text-lg">Menu</h2>
      <ul className="space-y-2">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/heatmaps">Heatmaps</Link></li>
        <li><Link href="/alerts">Alerts</Link></li>
      </ul>
    </div>
  );
}
