
import Link from "next/link";
import { products } from "@/app/data/products";

export default function ProductList() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-6"></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-5 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{product.description}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-green-600 font-bold text-base">${product.price}</span>
              <Link
                href={`/products/${product.id}`}
                className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}