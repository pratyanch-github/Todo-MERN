import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { API_URL } from "../App";

type User = {
  username: string;
  password: string;
};

export default function SignIn() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value.trim() }));
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData.username.length < 4 || userData.password.length < 4) {
      setMessage({
        type: "error",
        text: "Username and password must have 4 or more characters",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, status } = await axios.post(
        `${API_URL}/user/sign-in`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (status === 200) {
        localStorage.clear();
        localStorage.setItem("username", userData.username);
        localStorage.setItem("TOKEN", data.Token);

        setMessage({
          type: "success",
          text: "Logged in successfully! Redirecting...",
        });

        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: `[${err.response?.status}] ${err.response?.data?.msg}`,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your Todo-App account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Username Input */}
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={userData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="Username"
                  className="appearance-none relative block w-full px-3 py-3
                           border border-gray-300 rounded-lg
                           placeholder-gray-500 text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-transparent transition-all duration-200 bg-gray-50"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={viewPassword ? "text" : "password"}
                  value={userData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="Password"
                  className="appearance-none relative block w-full px-3 py-3
                           border border-gray-300 rounded-lg
                           placeholder-gray-500 text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-transparent transition-all duration-200 bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setViewPassword(!viewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-gray-600
                           transition-colors duration-200"
                >
                  {viewPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Status Message */}
            {message.text && (
              <div
                className={`p-4 rounded-lg text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                group relative w-full flex justify-center py-3 px-4
                border border-transparent rounded-lg text-white
                font-medium focus:outline-none focus:ring-2
                focus:ring-offset-2 transition-all duration-200
                ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                }
              `}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="font-medium text-blue-600 hover:text-blue-500
                           transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
