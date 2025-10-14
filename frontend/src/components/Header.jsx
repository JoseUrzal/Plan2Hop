export default function Header() {
  return (
    <div className="pt-8 pb-2 flex flex-col items-center  from-gray-900 via-gray-800 to-gray-700 text-gray-100">
      <h1 className="flex items-center text-5xl font-semibold text-indigo-200 mb-6">
        {/* Small logo on the left */}
        <img
          src="/backgrounds/myIcon.png"
          alt="Plan2Hop Logo"
          className="h-12 w-12 object-cover rounded-full mr-3"
        />
        <span>Plan 2 Hop</span>
      </h1>

      {/* Accent line below */}
      <span className="block h-1 w-24 bg-orange-500 rounded-full mx-auto"></span>
    </div>
  );
}
