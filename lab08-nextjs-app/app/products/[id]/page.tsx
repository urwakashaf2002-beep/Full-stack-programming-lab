import { products } from "@/app/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-white via-blue-50 to-blue-100 py-16 px-6">
      <div className="max-w-xl mx-auto">
        <Link href="/products" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-blue-800 mb-4 drop-shadow-md">{product.title}</h1>
          <p className="text-gray-800 text-base mb-6">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            <button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}