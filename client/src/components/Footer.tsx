export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 py-6 mt-[9rem]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <h3 className="text-xl font-bold text-blue-800">
              Todo Productivity Companion
            </h3>
          </div>

          <p className="text-sm text-gray-600 text-center max-w-md">
            Organize, prioritize, and conquer your tasks with ease. Every
            checked item is a step closer to your goals.
          </p>

          <div className="flex space-x-4">
            <a
              href="https://github.com/pratyanch-github/"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/pratyanch/"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              Linkedin
            </a>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="text-xs text-gray-500">
            Made with ❤️ for productivity enthusiasts
          </div>
        </div>
      </div>
    </footer>
  );
}
