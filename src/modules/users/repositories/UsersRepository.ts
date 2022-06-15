import {
  FindOptionsSelect,
  FindOptionsSelectByString,
  Repository,
} from "typeorm";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../database/entities/User";

class UserRepository {
  private repository: Repository<User>;

  constructor(private showPassword = false) {
    this.repository = AppDataSource.getRepository(User);
  }

  private setSelectList(
    showPassword: boolean
  ): FindOptionsSelect<User> | FindOptionsSelectByString<User> {
    const selectList = ["username", "id"];

    if (showPassword) {
      selectList.push("password");
    }

    return selectList as
      | FindOptionsSelect<User>
      | FindOptionsSelectByString<User>;
  }

  async list(): Promise<User[]> {
    return this.repository.find({ select: ["username", "id"] });
  }

  async create({ ...rest }: User): Promise<User> {
    const user = this.repository.create({ ...rest });
    const createdUser = await this.repository.save(user);

    return {
      username: createdUser.username,
      id: createdUser.id,
    } as User;
  }

  async findById(id: string): Promise<User> {
    const select = this.setSelectList(this.showPassword);

    const user = await this.repository.findOne({
      select,
      where: {
        id,
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const select = this.setSelectList(this.showPassword);

    return this.repository.findOne({
      select,
      where: {
        username,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.repository.delete({ id });

    return !!deleteResult;
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.repository.save({ ...user });

    return {
      username: updatedUser.username,
      id: updatedUser.id,
    } as User;
  }
}

export { UserRepository };
