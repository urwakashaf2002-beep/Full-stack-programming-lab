import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <h1 className="text-2xl font-extrabold tracking-wide">
        MyNextApp
      </h1>

      {/* ✅ Only keep simple nav OR remove completely */}
      <nav className="flex gap-6 text-sm font-semibold">
        <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
      </nav>
    </header>
  );
}