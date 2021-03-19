import { Router } from "express";
import upload from "./config/upload";
import OrphanagesController from "./controllers/OrphanagesController";
import UserController from "./controllers/UserController";
import TokenController from "./controllers/TokenController";
import loginRequired from "./middlewares/loginRequired";

const routes = Router();

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages", upload.array("images"), OrphanagesController.create);
routes.put(
  "/orphanages",
  loginRequired,
  upload.array("images"),
  OrphanagesController.update
);
routes.delete("/orphanages/:id", loginRequired, OrphanagesController.delete);

routes.post("/users", UserController.create);
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/forgot-password", UserController.forgotPassword);
routes.post("/password-reset", UserController.resetPassword);
routes.delete("/users/:id", UserController.delete);

routes.post("/tokens", TokenController.store);

export default routes;
