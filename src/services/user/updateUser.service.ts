import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserReturnComplet, IUserUpdate } from "../../interfaces/users.interfaces";
import { returnUserSchemaComplet } from "../../schemas/user.schemas";

const updateUserService = async (
  userData:IUserUpdate[],
  idUser: number
): Promise<IUserReturnComplet> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const oldUser = await userRepo.findOneBy({
    id: idUser,
  });

  const user = userRepo.create({
    ...oldUser,
    ...userData,
  });
  await userRepo.save(user);

  const updateUser = returnUserSchemaComplet.parse(user);

  return updateUser;
};

export default updateUserService;
