import { User } from "../../../database/entities/User";
import { AppError } from "../../../errors/AppError";
import { UserRepository } from "../repositories/UsersRepository";
import { hash } from "bcryptjs";

const usersRepository = new UserRepository();

class UserUseCase {
  async listUsers(): Promise<User[]> {
    const users = await usersRepository.list();

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await usersRepository.findById(id);

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await usersRepository.findByUsername(username);

    return user;
  }

  async createUser({ password, username }: User): Promise<User> {
    if (!username) {
      throw new AppError("Username is mandatory");
    }
    if (/\s/.test(username)) {
      throw new AppError("Username cannot contain spaces");
    }
    if (!password) {
      throw new AppError("Password is mandatory");
    }

    const userAlreadyExist = await usersRepository.findByUsername(username);

    if (userAlreadyExist) {
      throw new AppError("User already registered");
    }

    const passwordHash = await hash(password, 8);

    const newUser = {
      username,
      password: passwordHash,
    } as User;

    return usersRepository.create(newUser);
  }

  async delete(id: string): Promise<boolean> {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError("User does not exist");
    }

    const isDeleted = await usersRepository.delete(id);
    return !!isDeleted;
  }

  async update(user: User): Promise<User> {
    const userExist = await usersRepository.findById(user.id);

    if (!userExist) {
      throw new AppError("User does not exist");
    }

    const userToUpdate = {} as User;

    if (user.username) {
      userToUpdate.username = user.username;
    }

    if (user.password) {
      const passwordHash = await hash(user.password, 8);
      userToUpdate.password = passwordHash;
    }

    if (Object.keys(userToUpdate).length > 0) {
      const userAlreadyExist = await usersRepository.findByUsername(
        user.username
      );

      if (userAlreadyExist && userAlreadyExist.id !== user.id) {
        throw new AppError("Username already taken");
      }
    }

    userToUpdate.updatedAt = new Date();
    userToUpdate.id = user.id;

    return usersRepository.update(userToUpdate);
  }
}

export { UserUseCase };
