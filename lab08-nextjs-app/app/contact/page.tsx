export default function Contact() {
  return (
    <div className="min-h-full bg-gradient-to-b from-white via-blue-50 to-blue-100 flex flex-col items-center justify-start py-16 px-6">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 drop-shadow-md">Contact Us</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Message</label>
          <textarea
            placeholder="Your message..."
            rows={4}
            className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition w-full">
          Send Message
        </button>
      </div>
    </div>
  );
}