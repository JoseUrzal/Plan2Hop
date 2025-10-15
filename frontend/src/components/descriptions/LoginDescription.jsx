export default function LoginDescription({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  loading,
  error,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-6 w-full max-w-sm mx-auto"
    >
      <h2 className="text-center text-2xl font-bold text-indigo-200">
        Sign in to your account
      </h2>

      {/* Email */}
      <div className="flex flex-col space-y-1 relative">
        <label className="text-sm font-medium text-indigo-300">
          Email address
        </label>
        <div className="relative flex items-center">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="
    w-full pl-8 rounded-md bg-white/5 px-3 py-2 text-white placeholder-gray-500
    hover:shadow-lg hover:shadow-orange-700/30
    focus:shadow-lg focus:shadow-orange-700/30
    transition-all
    outline-none
  "
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col space-y-1 relative">
        <label className="text-sm font-medium text-indigo-300">Password</label>
        <div className="relative flex items-center">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="
    w-full pl-8 rounded-md bg-white/5 px-3 py-2 text-white placeholder-gray-500
    hover:shadow-lg hover:shadow-orange-700/30
    focus:shadow-lg focus:shadow-orange-700/30
    transition-all
    outline-none
  "
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
