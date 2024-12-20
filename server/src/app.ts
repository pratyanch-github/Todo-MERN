require("dotenv").config();
import express from "express";

const cors = require("cors");
const mongoose = require("mongoose");

import { AuthenticateUser } from "./middlewares/Authetication";
import { LogUserActivity } from "./middlewares/Logging";

import { TodoModel } from "./models/Todo";
import { UserModel } from "./models/User";
// import mongoose from "mongoose";

const TodoRoute = require("./routes/Todo");
const UserRoute = require("./routes/User");

// ALL constants from .env file
const PORT = process.env.PORT || 7777;
const DBName = process.env.DBName;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/" + DBName;
// console.log(MONGODB_URL)

// Initialize all
const app = express();

app.use(cors());
app.use(express.json());
app.use(LogUserActivity);

try {
  mongoose
    .connect(MONGODB_URL)
    .then((res: any) => {
      console.log("MongoDB connection successfull! : " + DBName);
    })
    .catch((err: any) => {
      console.log(err);
    });
} catch (err) {
  console.log(err);
  throw new Error("MongoDB connection failed!");
}

const Todos = TodoModel;
const Users = UserModel;

// app.post("/register",)
// let Todo = new Todos({
//     user: "janardan",
//     TodoTitle: "todo 1",
//     Tasks: ["task 1", "task 2", "task 3"]
// })

// Todos.save();

app.use("/todo", TodoRoute);
app.use("/user", UserRoute);

// console.log(process.env.JWT_SECRET)

app.get("/", (req, res) => {
  res.status(200).send("App up and running ✅");
});
app.listen(PORT, () => {
  console.log("server is running : " + PORT);
});
