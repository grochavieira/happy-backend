import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export default {
  async store(request: Request, response: Response) {
    const { email = "", password = "" } = request.body;

    if (!email || !password) {
      return response.json({
        error: "credenciais inválidas",
      });
    }

    const user: any = await User.findOne({ email });

    if (!user) {
      return response.json({
        error: "usuário não existe",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return response.json({
        error: "senha inválida",
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET || "", {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    const returnedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response.status(201).json({ token, user: returnedUser });
  },
};
