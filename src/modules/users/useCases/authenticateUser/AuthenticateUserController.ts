import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const authenticateUserUseCase = new AuthenticateUserUseCase();

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, username } = request.body;

    const token = await authenticateUserUseCase.execute({
      password,
      username,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };
