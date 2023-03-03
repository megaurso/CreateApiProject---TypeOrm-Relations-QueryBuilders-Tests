import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUser, IUserReturnComplet } from "../../interfaces/users.interfaces";
import { returnUserSchemaComplet } from "../../schemas/user.schemas";

const createUserService = async (
  userData: IUser
): Promise<IUserReturnComplet> => {
  const userRepo: Repository<IUser> = AppDataSource.getRepository(User);

  const user = userRepo.create(userData);

  await userRepo.save(user);

  const newUser: IUserReturnComplet = returnUserSchemaComplet.parse(user);

  return newUser;
};

export { createUserService };
