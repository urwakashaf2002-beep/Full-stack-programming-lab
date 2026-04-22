import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-blue-100 flex flex-col justify-center items-center min-h-[80vh] text-center">
      
      <h1 className="text-5xl font-extrabold text-blue-800 mb-6 drop-shadow-md">
        Welcome to MyNextApp
      </h1>

      <p className="text-gray-700 text-lg mb-8 font-medium">
        A vibrant multi-page Next.js application built for Lab 08.
      </p>

      <div className="flex justify-center gap-6">
        <Link href="/about" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
          About Us
        </Link>

        <Link href="/contact" className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-700 transition">
          Contact
        </Link>

        <Link href="/products" className="bg-yellow-500 text-black px-6 py-3 rounded-lg shadow hover:bg-yellow-600 transition">
          Products
        </Link>
      </div>

    </div>
  );
}