import mongoose from "mongoose";
import { UserType } from "../types/UserType";

const UserSchema = new mongoose.Schema<UserType>({
  username: String,
  hashedPassword: String,
});

export const UserModel = mongoose.model<UserType>("Users", UserSchema);
