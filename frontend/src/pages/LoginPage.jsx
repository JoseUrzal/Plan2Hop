import { useState } from "react";
import { useUser } from "../providers/UserProvider";
import Header from "../components/Header";
import LoginDescription from "../components/descriptions/LoginDescription";

export default function LoginPage() {
  const { login, loading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      // TODO: redirect or handle successful login
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="space-y-8 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100 min-h-screen">
      <Header />
      <LoginDescription
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}
