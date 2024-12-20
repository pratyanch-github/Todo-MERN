import { CreateTask, CreateTodo, MarkTaskStatus, DeleteTask, DeleteTodo, GetAllTasksOfATodo, GetAllTodos, EditTask } from "../controllers/Todo"
import { AuthenticateUser } from "../middlewares/Authetication";
import express from "express";

const router = express.Router();

router.post("/create_task", AuthenticateUser, CreateTask);
router.post("/create_todo", AuthenticateUser, CreateTodo);
router.post("/task_status", AuthenticateUser, MarkTaskStatus);
router.post("/task_edit", AuthenticateUser, EditTask);

router.delete("/delete_task", AuthenticateUser, DeleteTask);
router.delete("/delete_todo", AuthenticateUser, DeleteTodo);

router.get("/get_tasks", AuthenticateUser, GetAllTasksOfATodo);
router.get("/get_todos", AuthenticateUser, GetAllTodos);

module.exports = router;