import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import userView from "../views/user_view";
import * as Yup from "yup";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import path from "path";
import handlebars from "nodemailer-express-handlebars";
import crypto from "crypto";

export default {
  async index(request: Request, response: Response) {
    const users = await User.find();

    return response.json(users);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await User.findById(id);

    return response.json(userView.render(user));
  },

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userExist = await User.findOne({ email });

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

    const newUser = new User(data);

    await newUser.save();

    return response
      .status(201)
      .json({ success: "usuário cadastrado com sucesso!" });
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = await User.findById(id);

    if (user) {
      await user.delete();
    }

    return response
      .status(201)
      .json({ success: "usuário deletado com sucesso!" });
  },

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    const user = await User.findOne({ email });
    if (!user) {
      return response.json({ error: "não existe usuário com este email!" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();
    now.setHours(now.getHours() + 1);

    const newUser = await user.update({
      password_reset_token: token,
      password_reset_expires: now.toString(),
    });
    console.log(newUser);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
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
      from: `Admnistrador do Happy <${process.env.EMAIL_USERNAME}>`,
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
        return response.json({
          error: "não foi possível enviar o email! " + err,
        });
      });
  },

  async resetPassword(request: Request, response: Response) {
    const { email, token, password } = request.body;

    const user: IUser[] | any = await User.findOne({ email });

    if (!user) {
      return response.json({ error: "não existe usuário com este email!" });
    }

    if (user.password_reset_token && user.password_reset_token === token) {
      const newUser = await user.update({
        password: await bcryptjs.hash(password, 8),
      });

      return response.json({ success: "senha trocada com sucesso!" });
    }
    return response.json({ error: "token inválido" });
  },
};
