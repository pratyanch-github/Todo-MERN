import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TaskItem from "../components/Task";
import AddTask from "../components/AddTask";
import { API_URL } from "../App";

type Task = {
  Task: string;
  isDone: boolean;
};

export default function Home() {
  const navigate = useNavigate();
  const user = localStorage.username;
  const TOKEN = localStorage.TOKEN;
  const todoTitle = `${user}'s todo`;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [appErrStatus, setAppErrStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Set up axios defaults
  axios.defaults.headers.common = { Authorization: `Bearer ${TOKEN}` };
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const handleError = (err: any) => {
    console.error(err);
    setAppErrStatus(true);
    setErrorMessage(`[${err.response?.status}] ${err.response?.data?.msg}`);
    if (err.response?.status === 401) {
      setTimeout(() => {
        localStorage.clear();
        navigate("/sign-in");
      }, 2000);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    if (!user || !TOKEN) {
      navigate("/sign-in");
      return;
    }

    const getAllTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/todo/get_tasks`, {
          params: { user, TodoTitle: todoTitle },
        });
        setTasks(response.data.Tasks);
      } catch (err: any) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getAllTasks();
  }, [user, TOKEN, navigate, todoTitle]);

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;

    try {
      await axios.post(`${API_URL}/todo/create_task`, {
        TodoTitle: todoTitle,
        Task: newTask,
        user,
        isDone: false,
      });
      setTasks([...tasks, { Task: newTask, isDone: false }]);
      setNewTask("");
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleDeleteTask = async (taskTitle: string) => {
    try {
      await axios.delete(`${API_URL}/todo/delete_task`, {
        data: { TodoTitle: todoTitle, Task: taskTitle, user },
      });
      setTasks(tasks.filter((task) => task.Task !== taskTitle));
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleTaskStatus = async (taskTitle: string, taskStatus: boolean) => {
    try {
      await axios.post(`${API_URL}/todo/task_status`, {
        TodoTitle: todoTitle,
        Task: taskTitle,
        user,
        isDone: taskStatus,
      });
      setTasks(
        tasks.map((task) =>
          task.Task === taskTitle ? { ...task, isDone: taskStatus } : task
        )
      );
    } catch (err: any) {
      handleError(err);
    }
  };

  const handleTaskEdit = async (taskTitle: string, newTitle: string) => {
    try {
      await axios.post(`${API_URL}/todo/task_edit`, {
        user,
        TodoTitle: todoTitle,
        Task: taskTitle,
        NewTitle: newTitle,
      });
      setTasks(
        tasks.map((task) =>
          task.Task === taskTitle ? { ...task, Task: newTitle } : task
        )
      );
    } catch (err: any) {
      handleError(err);
    }
  };

  if (!user || !TOKEN) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header username={user} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskItem
                  key={task.Task}
                  taskTitle={task.Task}
                  taskDelete={handleDeleteTask}
                  taskStatus={task.isDone}
                  taskStatusHandler={handleTaskStatus}
                  handleTaskEdit={handleTaskEdit}
                />
              ))}
            </div>

            <div className="mt-6">
              <AddTask
                state={newTask}
                setState={setNewTask}
                button={handleAddTask}
              />
            </div>

            {appErrStatus && (
              <div className="mt-6 text-center text-red-600 bg-red-50 p-4 rounded-lg">
                {errorMessage}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
