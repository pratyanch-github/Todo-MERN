require("dotenv").config();

import { UserModel } from "../models/User";
import { UserType } from "../types/UserType";

import md5 from "md5";
import jwt from "jsonwebtoken";
import express from "express";
import mongoose from "mongoose";

// some issue with this
const JWT_SECRET = process.env.JWT_SECRET;
// now working with same code
// console.log(JWT_SECRET, "from this file")

const Users: mongoose.Model<UserType> = UserModel;

// const GetAllUsers = async (req: express.Request, res: express.Response) => {
//     const AllUserObjs = await Users.find();

//     let AllUsers: string[] = [];

//     for (let i = 0; i < AllUserObjs.length; i++) {
//         AllUsers.push(AllUserObjs[i].username);
//     }

//     return AllUsers;
// }

// export const GetUser = async (req: express.Request, res: express.Response) => {

// }

const CheckIfUserExists = async (username: string) => {
  const exists = await Users.findOne({ username });
  if (exists !== null && exists.username === username) {
    return true;
  } else false;
};

export const RegisterUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("regestering triggereed");
  const username: string = req.body.username;
  const password: string = req.body.password;

  const hashedPassword = md5(password);
  //check  if user already exists

  try {
    if (!(await CheckIfUserExists(username))) {
      console.log("Registering user: " + username);
      const user = new Users({
        username,
        hashedPassword,
      });

      let saveUser = async function () {
        await user.save();
      };
      saveUser();

      res.status(200).json({
        msg: "User registration successfull!",
      });

      console.log("User registration successfull!");
    } else {
      res.status(403).json({
        msg: "User already exists!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(501).json({
      msg: "Failed to register user!",
    });
  }
};

export const LoginUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  const hashedPassword: string = md5(password);

  console.log("Logging in user: " + username);

  try {
    if (await CheckIfUserExists(username)) {
      const user = await Users.findOne({ username });

      if (
        user !== null &&
        user.username === username &&
        user.hashedPassword === hashedPassword
      ) {
        const token = jwt.sign({ username }, JWT_SECRET as string, {
          expiresIn: "365 days",
        });
        res.json({
          msg: "User login successfull!",
          Token: token,
        });
        console.log("Logged in successfully!");
      } else {
        console.log("Login failed!");
        res.status(403).json({
          msg: "Invalid credentials!",
        });
      }
    } else {
      res.status(403).json({
        msg: "User doesn't exist!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(501).json({
      msg: "Failed to login!",
    });
  }
};
