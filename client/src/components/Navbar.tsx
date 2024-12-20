import { useState } from "react";
import AddTodo from "./AddTodo";

export default function TaskNavbar() {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-200 p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl  font-semibold text-black">Todo Lists</h2>
          <p className="text-sm text-gray-500 mt-1">
            {todos.length} list{todos.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-700">{todo}</span>
                <button
                  onClick={() => setTodos(todos.filter((_, i) => i !== index))}
                  className="hidden group-hover:block text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No todo lists yet
            </div>
          )}
        </div>

        {/* Add Todo Form */}
        <div className="pt-4 border-t border-gray-200">
          <AddTodo state={todos} add_to_state={setTodos} />
        </div>
      </div>

      {/* Optional: Quick Actions */}
      <div className="mt-8">
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            🔍 Search Lists
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            📋 All Lists
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            ⭐ Favorites
          </button>
        </div>
      </div>
    </aside>
  );
}
