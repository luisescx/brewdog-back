import { Request, Response } from "express";
import { User } from "../../../database/entities/User";
import { AppError } from "../../../errors/AppError";
import { UserUseCase } from "../useCases/UsersUseCase";

const usersUseCase = new UserUseCase();

class UsersController {
  async listUsers(request: Request, response: Response): Promise<Response> {
    const usersList = await usersUseCase.listUsers();

    return response.json(usersList);
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      throw new AppError("Please inform the id");
    }

    const user = await usersUseCase.findById(id);

    if (!user) {
      throw new AppError("User does not exist");
    }

    return response.json(user);
  }

  async getByUsername(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    if (!username) {
      throw new AppError("Please inform the username");
    }

    const user = await usersUseCase.findByUsername(username);

    if (!user) {
      throw new AppError("User does not exist");
    }

    return response.json(user);
  }

  async createUser(request: Request, response: Response): Promise<Response> {
    const user = { ...request.body } as User;

    const newUser = await usersUseCase.createUser(user);

    return response.status(201).json(newUser);
  }

  async deleteUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      throw new AppError("Please inform the id");
    }

    const isDeleted = await usersUseCase.delete(id);

    return response.status(201).json(isDeleted);
  }

  async updateUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = { ...request.body } as User;

    if (!id) {
      throw new AppError("Please inform the id");
    }

    const userUpdated = await usersUseCase.update({ ...user, id });
    return response.status(201).json(userUpdated);
  }
}

export { UsersController };
