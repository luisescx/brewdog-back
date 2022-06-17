import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import { UserRepository } from "../../repositories/UsersRepository";
import { compare } from "bcryptjs";
import { auth } from "../../../../config";

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: {
    username: string;
    id: string;
  };
  token: string;
}

const usersRepository = new UserRepository(true);

class AuthenticateUserUseCase {
  async execute({ password, username }: IRequest): Promise<IResponse> {
    const user = await usersRepository.findByUsername(username);

    if (!user) {
      throw new AppError("Username or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Username or password incorrect");
    }

    const token = sign({}, auth.secret, {
      subject: user.id,
      expiresIn: "1d",
      algorithm: "HS512",
    });

    return {
      token,
      user: {
        username: user.username,
        id: user.id,
      },
    };
  }
}

export { AuthenticateUserUseCase };
