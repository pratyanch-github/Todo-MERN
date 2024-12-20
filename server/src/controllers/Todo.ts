import { TodoModel } from "../models/Todo"
import { TodoType } from "../types/TodoType";

import express from "express";
import mongoose from "mongoose";

const Todos: mongoose.Model<TodoType> = TodoModel;


const CheckIfTodoExists = async (TodoTitle: string, user: string) => {
    const exists = await Todos.findOne({ TodoTitle, user });
    if (exists !== null && exists.TodoTitle === TodoTitle) {
        return true;
    }
    else false;
}

export const MarkTaskStatus = async (req: express.Request, res: express.Response) => {
    const TodoTitle: string = req.body.TodoTitle;
    const Task: string = req.body.Task;
    const user: string = req.body.user;
    const status: boolean = req.body.isDone;

    try {
        if (await CheckIfTodoExists(TodoTitle, user)) {
            let Todo: any = await Todos.findOne({ TodoTitle, user });

            // Todo.Tasks.push({ Task: Task, isDone });
            for (let i = 0; i < Todo.Tasks.length; i++) {
                if (Todo.Tasks[i].Task === Task) {
                    Todo.Tasks[i].isDone = status;
                }
            }

            await Todo.save();

            res.status(200).json({
                msg: status === true ? "Task marked as done" : "Task marked as not done"
            });
        }
        else {
            res.status(403).json({
                msg: "Todo does not exist"
            })
        }

    }
    catch (err) {
        console.log(err);
        res.status(501).json({
            msg: "Failed to mark task as done"
        })
    }

}

export const CreateTask = async (req: express.Request, res: express.Response) => {

    try {
        const TodoTitle: string = req.body.TodoTitle;
        const NewTask: string = req.body.Task;
        const user: string = req.body.user;
        const isDone: boolean = false;

        if (await CheckIfTodoExists(TodoTitle, user)) {
            let Todo: any = await Todos.findOne({ TodoTitle, user });

            Todo.Tasks.push({ Task: NewTask, isDone });

            await Todo.save();

            res.status(200).json({
                msg: "Task created and added to Todo"
            });
        }
        else {
            res.status(403).json({
                msg: "Todo does not exist"
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(501).json({
            msg: "Task not created"
        })
    }
    // let tempTasks = Todo.Tasks;
    // let Tasks = tempTasks.push(NewTask);

    // let filter = { TodoTitle };
    // let update = { Tasks };

    // await Todos.findOneAndUpdate(filter, update);
}

export const CreateTodo = async (req: express.Request, res: express.Response) => {

    try {
        const user: string = req.body.user;
        const TodoTitle = req.body.TodoTitle;

        // const tasks = req.body.Tasks;

        // Check if todo already exists
        // const already_exists = await Todos.findOne({ TodoTitle: todoTitle })
        // console.log(already_exists)


        if (await CheckIfTodoExists(TodoTitle, user)) {
            res.status(403).json({
                msg: "Todo already exists"
            })
            return;
        }

        else {
            const newTodo = new Todos({
                user: user,
                TodoTitle,
                Tasks: [],
            });

            await newTodo.save();

            res.status(200).json({
                msg: "Todo created"
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(501).json({
            msg: "Todo creation failed"
        })
    }
}

export const DeleteTask = async (req: express.Request, res: express.Response) => {

    try {
        const TodoTitle: string = req.body.TodoTitle;
        const Task: string = req.body.Task;
        const user: string = req.body.user;

        // Check if todo exists
        // const exists = await Todos.findOne({ TodoTitle })
        // console.log(already_exists)


        if (await CheckIfTodoExists(TodoTitle, user)) {
            let Todo: any = await Todos.findOne({ user, TodoTitle });

            let tempTasks: [{ Task: string, isDone: boolean }] = Todo.Tasks;

            for (let i = 0; i < tempTasks.length; i++) {
                if (tempTasks[i].Task === Task) {
                    tempTasks.splice(i, 1);
                    break;
                }
            }

            Todo.Tasks = tempTasks;
            await Todo.save()

            res.status(200).json({
                msg: "Task deleted"
            })
        }
        else {
            res.status(403).json({
                msg: "Todo does not exist"
            })
        }


    }
    catch (err) {
        console.log(err);
        res.status(501).json({
            msg: "Task deletion faield"
        })
    }

    // let Todo = await Todos.findOne({ TodoTitle });

    // let filter = { TodoTitle };
    // let Tasks;

    // for (let i = 0; i < Todo.Tasks.length; i++) {
    //     if (Todo.Tasks[i] === Task) {
    //         let tempTasks = Todo.Tasks;
    //         tempTasks.splice(i, 1);
    //         Tasks = tempTasks;
    //         break;
    //     }
    // }
    // let update = { Tasks };

    // await Todos.findOneAndUpdate(filter, update);
}

export const DeleteTodo = async (req: express.Request, res: express.Response) => {
    try {
        const TodoTitle: string = req.body.TodoTitle;
        const user: string = req.body.user;
        // Check if todo exists
        // const exists = await Todos.findOne({ TodoTitle })
        // console.log(already_exists)


        if (await CheckIfTodoExists(TodoTitle, user)) {
            await Todos.deleteOne({ TodoTitle, user });

            res.status(200).json({
                msg: "Todo deleted"
            })
        }
        else {
            res.status(403).json({
                msg: "Todo does not exist"
            })
        }

    }
    catch (err) {
        res.status(501).json({
            msg: "Todo deletion failed"
        })
    }
}

export const GetAllTasksOfATodo = async (req: express.Request, res: express.Response) => {
    try {

        const TodoTitle: string = req.query.TodoTitle as string;
        const user: string = req.query.user as string;

        // Check if todo exists
        // const exists = await Todos.findOne({ TodoTitle })
        // console.log(already_exists)


        if (await CheckIfTodoExists(TodoTitle, user)) {

            const Todo: any = await Todos.findOne({ TodoTitle, user });
            let tasks: { Task: string, isDone: boolean }[] = [];

            for (let i = 0; i < Todo.Tasks.length; i++) {
                tasks.push({ Task: Todo.Tasks[i].Task, isDone: Todo.Tasks[i].isDone })
            }

            res.status(200).json({ Tasks: tasks });
        }
        else {
            res.status(403).json({
                msg: "Todo does not exist"
            })
        }

    }
    catch (err) {
        console.log(err);
        res.status(501).json("Could not get tasks")
    }
}

export const GetAllTodos = async (req: express.Request, res: express.Response) => {
    try {
        const user: string = req.query.user as string;
        let AllTodoObjs = await Todos.find({ user });

        let AllTodos: string[] = [];

        for (let i = 0; i < AllTodoObjs.length; i++) {
            AllTodos.push(AllTodoObjs[i].TodoTitle)
        }

        if (AllTodoObjs !== null) {
            let TodosArray: {
                user: string,
                TodoTitle: string,
                Tasks: {
                    Task: string,
                    isDone: boolean
                }[]
            }[] = [];

            for (let i = 0; i < AllTodoObjs.length; i++) {

                let curr_obj = AllTodoObjs[i];

                let curr_obj_tasks:
                    {
                        Task: string,
                        isDone: boolean
                    }[] = [];

                for (let j = 0; j < curr_obj.Tasks.length; j++) {
                    curr_obj_tasks.push({ Task: curr_obj.Tasks[j].Task, isDone: curr_obj.Tasks[j].isDone })
                }

                TodosArray.push({
                    user: user,
                    TodoTitle: curr_obj.TodoTitle,
                    Tasks: curr_obj_tasks
                })
            }

            res.status(200).json({
                Todos: TodosArray
            })
        }
        else {
            res.status(503).json("Could not get todos")
        }

    }
    catch (err) {
        console.log(err);
        res.status(501).json({
            msg: "Could not get todos"
        })
    }
}


// to edit already existing task

export const EditTask = async (req: express.Request, res: express.Response) => {
    const TodoTitle: string = req.body.TodoTitle;
    const Task: string = req.body.Task;
    const NewTaskTitle: string = req.body.NewTitle;
    const user: string = req.body.user;

    try {
        if (await CheckIfTodoExists(TodoTitle, user)) {
            let Todo: any = await Todos.findOne({ TodoTitle, user });

            // Todo.Tasks.push({ Task: Task, isDone });
            for (let i = 0; i < Todo.Tasks.length; i++) {
                if (Todo.Tasks[i].Task === Task) {
                    Todo.Tasks[i].Task = NewTaskTitle;
                }
            }

            await Todo.save();

            res.status(200).json({
                msg: "Task updated"
            });
        }
        else {
            res.status(403).json({
                msg: "Todo does not exist"
            })
        }

    }
    catch (err) {
        console.log(err);
        res.status(501).json({
            msg: "Failed to update task"
        })
    }

}