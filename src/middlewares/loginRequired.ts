import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../models/User";

export default async (
  request: Request | any,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      errors: ["Login required"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ id, email });

    if (!user) {
      return response.status(401).json({
        errors: ["Usuário inválido."],
      });
    }

    request.userId = id;
    request.userEmail = email;
    return next();
  } catch (e) {
    return response.status(401).json({
      errors: ["Token expirado ou inválido."],
    });
  }
};
