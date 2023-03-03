import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  userSchemas,
  returnUserSchemaComplet,
  returnUserSchemaWithId,
  returnArrayUsers,
  userUpdateSchema,
} from "../schemas/user.schemas";

type IUser = z.infer<typeof userSchemas>;
type IUserReturnId = z.infer<typeof returnUserSchemaWithId>;
type IUserReturnComplet = z.infer<typeof returnUserSchemaComplet>;
type IUsersReturnArray = z.infer<typeof returnArrayUsers>
type IUserUpdate = DeepPartial<IUser>

export { IUser, IUserReturnComplet, IUserReturnId,IUsersReturnArray,IUserUpdate };
