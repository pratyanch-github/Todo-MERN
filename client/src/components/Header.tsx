import { useState } from "react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  username: string;
};

export default function Header({ username }: HeaderProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    // Add a subtle animation before logout
    setIsHovered(false);
    setTimeout(() => {
      localStorage.clear();
      navigate("/sign-in");
    }, 200);
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/App Name */}
          <div className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Todo App
            </h1>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <div className="hidden sm:flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{username}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
                relative overflow-hidden px-4 py-2 rounded-lg
                font-medium text-sm transition-all duration-300
                ${
                  isHovered
                    ? "bg-red-500 text-white pl-8"
                    : "bg-gray-50 text-gray-700"
                }
                hover:shadow-md focus:outline-none focus:ring-2 
                focus:ring-red-500 focus:ring-offset-2
              `}
            >
              {/* Animated Icon */}
              <span
                className={`absolute left-3 transition-all duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0 -translate-x-4"
                }`}
              >
                👋
              </span>

              {/* Button Text */}
              <span className="relative">Logout</span>
            </button>
          </div>
        </div>

        {/* Optional: Navigation or Breadcrumbs */}
        <nav className="hidden sm:flex space-x-4 py-2 text-sm">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Dashboard
          </a>
          <span className="text-gray-300">/</span>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            My Tasks
          </a>
        </nav>
      </div>
    </header>
  );
}
