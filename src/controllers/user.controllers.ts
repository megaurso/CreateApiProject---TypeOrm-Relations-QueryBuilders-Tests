import { Request, Response } from "express";
import { IUser, IUserReturnComplet, IUserUpdate } from "../interfaces/users.interfaces";
import { createUserService } from "../services/user/createUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import listUsers from "../services/user/listUser.service";
import updateUserService from "../services/user/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUser = req.body;
  const newUser: IUserReturnComplet = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const users = await listUsers();
  return res.json(users);
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const userData = req.body;
  const idUser = parseInt(req.params.id);

  const updateUser = await updateUserService(userData, idUser);

  return res.json(updateUser);
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  await deleteUserService(parseInt(req.params.id));

  return res.status(204).send();
};
export { createUserController, listAllUsers, updateUser, deleteUser };
