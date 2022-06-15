import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { auth } from "../config";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/users/repositories/UsersRepository";

interface ITokenPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = verify(token, auth.secret) as ITokenPayload;

    const usersRepository = new UserRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    next();
  } catch {
    throw new AppError("Invalid Token", 401);
  }
}
