import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-white via-blue-50 to-blue-100 py-16 px-6">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow-md">
        Our Products
      </h1>
      <ProductList />
    </div>
  );
}