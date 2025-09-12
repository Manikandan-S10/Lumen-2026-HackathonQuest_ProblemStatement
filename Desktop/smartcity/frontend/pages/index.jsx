import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">6G Smart City Connectivity</h1>
      <p className="mt-4">Welcome to Smart City Dashboard</p>
      <Link href="/login" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        Login
      </Link>
    </div>
  );
}
