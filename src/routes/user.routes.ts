import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { UsersController } from "../modules/users/controllers/UsersController";

const userRoutes = Router();

const usersController = new UsersController();

userRoutes.get("/list", ensureAuthenticated, usersController.listUsers);

userRoutes.get("/getById/:id", ensureAuthenticated, usersController.getById);

userRoutes.get(
  "/getByUsername/:username",
  ensureAuthenticated,
  usersController.getByUsername
);

userRoutes.delete(
  "/delete/:id",
  ensureAuthenticated,
  usersController.deleteUser
);

userRoutes.post("/create", usersController.createUser);

userRoutes.patch(
  "/update/:id",
  ensureAuthenticated,
  usersController.updateUser
);

export { userRoutes };
