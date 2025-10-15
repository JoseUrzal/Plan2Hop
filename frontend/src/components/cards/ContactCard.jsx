import { useState } from "react";

export default function ContactCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="py-12">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col space-y-6 w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-indigo-200 text-center">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:ring-1 focus:ring-orange-400 focus:shadow-lg transition-shadow"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:ring-1 focus:ring-orange-400 focus:shadow-lg transition-shadow"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full px-3 py-2 rounded-md bg-gray-900 text-white placeholder-gray-500 focus:ring-1 focus:ring-orange-400 focus:shadow-lg transition-shadow resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-400 rounded-md font-semibold text-white transition disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send Message"}
          </button>
        </form>

        {success && (
          <p className="text-green-400 text-center mt-2 font-medium">
            Message sent successfully!
          </p>
        )}
      </div>
    </div>
  );
}
