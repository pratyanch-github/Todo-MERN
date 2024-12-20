import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { API_URL } from "../App";

type User = {
  username: string;
  password: string;
};

export default function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User>({
    username: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value.trim() }));
    setError(""); // Clear error when user types
  };

  const handleError = (err: any) => {
    setIsLoading(false);
    const errorMessage = err.response?.data?.msg
      ? `[${err.response.status}] ${err.response.data.msg}`
      : "An error occurred. Please try again.";
    setError(errorMessage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData.username.length < 4 || userData.password.length < 4) {
      setError("Username and password must have 4 or more characters");
      return;
    }

    setIsLoading(true);

    try {
      // Create user account
      const { data: signUpData } = await axios.post(
        `${API_URL}/user/sign-up`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      // Sign in user
      const { data: signInData } = await axios.post(
        `${API_URL}/user/sign-in`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      const TOKEN = signInData.Token;

      // Create initial todo
      await axios.post(
        `${API_URL}/todo/create_todo`,
        {
          user: userData.username,
          TodoTitle: `${userData.username}'s todo`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      localStorage.clear();
      localStorage.setItem("username", userData.username);
      localStorage.setItem("TOKEN", TOKEN);

      navigate("/account-created");
    } catch (err: any) {
      handleError(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50">
      <div className="max-w-md mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="mt-2 text-gray-600">
            Start organizing your tasks today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition duration-200 bg-white text-gray-900"
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={viewPassword ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200 bg-white text-gray-900"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setViewPassword(!viewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
                         hover:text-gray-700 transition-colors"
              >
                {viewPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 px-4 rounded-lg font-medium text-white
              transition duration-200 
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                Creating account...
              </span>
            ) : (
              "Sign up"
            )}
          </button>

          {/* Sign In Link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
