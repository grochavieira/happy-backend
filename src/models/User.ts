import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  password_reset_token: string;
  password_reset_expires: string;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  password_reset_token: { type: String, required: false },
  password_reset_expires: { type: String, required: false },
});

export default mongoose.model("User", UserSchema);
