export default function About() {
  return (
    <div className="min-h-full bg-gradient-to-b from-white via-blue-50 to-blue-100 flex flex-col items-center justify-start py-16 px-6">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6 drop-shadow-md">About Us</h1>
      <div className="max-w-2xl text-center">
        <p className="text-gray-800 text-lg leading-relaxed mb-6">
          This application was created as part of the Full Stack Programming Lab 08
          at the university. It demonstrates how to build a multi-page Next.js app
          with reusable components.
        </p>
        <p className="text-gray-800 text-lg leading-relaxed">
          We use Next.js App Router, Tailwind CSS for styling, and TypeScript for
          type safety.
        </p>
      </div>
    </div>
  );
}