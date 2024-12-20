import React, { useState } from "react";

export default function TaskItem(props: any) {
  const [status, setStatus] = useState(props.taskStatus);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");

  function handleDelete() {
    props.taskDelete(props.taskTitle);
  }

  function handleTaskStatus() {
    props.taskStatusHandler(props.taskTitle, !status);
    setStatus(!status);
  }

  function handleTaskEdit() {
    setEditTask(true);
    setTask(props.taskTitle);
  }

  function handleTaskEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  async function handleTaskEditButton() {
    await props.handleTaskEdit(props.taskTitle, task);
    setEditTask(false);
  }

  const buttonClass =
    "w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus:outline-none";

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 mb-3 flex items-center justify-between gap-4">
      {editTask ? (
        <input
          onChange={handleTaskEditChange}
          value={task}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTaskEditButton();
          }}
          className={`flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors duration-300
                    ${status ? "text-gray-400 line-through" : "text-gray-700"}`}
        />
      ) : (
        <p
          className={`flex-1 px-4 py-2 text-left
                ${status ? "text-gray-400 line-through" : "text-gray-700"}`}
        >
          {props.taskTitle}
        </p>
      )}

      <div className="flex gap-2">
        {editTask ? (
          <button
            onClick={handleTaskEditButton}
            className={`${buttonClass} bg-green-50 hover:bg-green-100 text-green-600`}
          >
            ✓
          </button>
        ) : (
          <>
            <button
              onClick={handleTaskEdit}
              className={`${buttonClass} bg-blue-50 hover:bg-blue-100 text-blue-600`}
            >
              ✎
            </button>
            <button
              onClick={handleTaskStatus}
              className={`${buttonClass} bg-green-50 hover:bg-green-100 text-green-600`}
            >
              ✓
            </button>
            <button
              onClick={handleDelete}
              className={`${buttonClass} bg-red-50 hover:bg-red-100 text-red-600`}
            >
              ×
            </button>
          </>
        )}
      </div>
    </div>
  );
}
