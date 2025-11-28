import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BgImage from "../assets/images/bgImage.webp";

const Login = () => {
  const baseUrl = "https://pos-inventory-api.vercel.app";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",   // FIXED
        },
        body: JSON.stringify({ email, password }), // FIXED
      });

      if (!res.ok) {
        throw new Error(`Login failed: ${res.status}`);
      }

      const data = await res.json();
      const { token, user } = data;   // FIXED

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/manage/dashboard");  // FIXED
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Invalid email or password. Please try again."); // FIXED
    }
  };

  return (
    <div
      className="flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",        // FIXED
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6 mt-7">

        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-green-900 text-white rounded-full flex items-center justify-center font-bold text-2xl">
              POS
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Inventory POS Login</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your store efficiently</p>
        </div>

        <form className="space-y-5" onSubmit={handleLoginSubmit}>
          {loginError && (
            <p className="text-red-600 text-sm">{loginError}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // FIXED
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // FIXED
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-900 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm">© 2025 Inventory POS System</p>
      </div>
    </div>
  );
};

export default Login;
