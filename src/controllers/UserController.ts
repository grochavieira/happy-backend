import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import userView from "../views/user_view";
import * as Yup from "yup";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import path from "path";
import handlebars from "nodemailer-express-handlebars";
import crypto from "crypto";

export default {
  async index(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return response.json(users);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail(id);

    return response.json(userView.render(user));
  },

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const usersRepository = getRepository(User);

    const userExist = await usersRepository.findOne({ email });

    if (userExist) {
      console.log(userExist);
      return response.json({ error: "usuário com este email já existe!" });
    }

    const data = {
      name,
      email,
      password: await bcryptjs.hash(password, 8),
      password_reset_token: "",
      password_reset_expires: "",
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return response
      .status(201)
      .json({ success: "usuário cadastrado com sucesso!" });
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail(id);

    if (user) {
      const response = await usersRepository.delete(id);
    }

    return response
      .status(201)
      .json({ success: "usuário deletado com sucesso!" });
  },

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return response.json({ error: "não existe usuário com este email!" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();
    now.setHours(now.getHours() + 1);

    const newUser = await usersRepository.update(user.id, {
      password_reset_token: token,
      password_reset_expires: now.toString(),
    });

    console.log(newUser);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "grochavieira.sender.dev@gmail.com",
        pass: "grochavieira1234",
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".html",
        partialsDir: path.resolve("./src/resources/mail"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./src/resources/mail"),
      extName: ".html",
    };

    transporter.use("compile", handlebars(handlebarOptions));

    const mailOptions = {
      from: "Admnistrador do Happy <grochavieira.dev@gmail.com>",
      to: email,
      subject: "Resetar Senha - Happy",
      template: "index",
      context: { token, host: process.env.APP_HOST },
    };

    transporter
      .sendMail(mailOptions)
      .then(() => {
        return response.json({ success: "email enviado!" });
      })
      .catch((err) => {
        console.log(err);
        return response.json({ error: "não foi possível enviar o email!" });
      });
  },

  async resetPassword(request: Request, response: Response) {
    const { email, token, password } = request.body;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return response.json({ error: "não existe usuário com este email!" });
    }

    if (user.password_reset_token && user.password_reset_token === token) {
      const newUser = await usersRepository.update(user.id, {
        password: await bcryptjs.hash(password, 8),
      });

      return response.json({ success: "senha trocada com sucesso!" });
    }
    return response.json({ error: "token inválido" });
  },
};
