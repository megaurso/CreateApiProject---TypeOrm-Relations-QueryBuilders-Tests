import { Router } from "express";
import { createUserController, deleteUser, listAllUsers, updateUser } from "../controllers/user.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureEmailAlreadyExist from "../middlewares/ensureEmailAlreadyExists.middleware";
import ensureIsAdmin from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import verifyAdminOrOwner from "../middlewares/ensureUserAdminOrNoCanChange.middlewares";
import ensureUserExistMiddleware from "../middlewares/ensureUserExist.middleware";
import { userSchemas, userUpdateSchema } from "../schemas/user.schemas";

const userRoutes: Router = Router()

userRoutes.post("",ensureDataIsValidMiddleware(userSchemas),ensureEmailAlreadyExist,createUserController)
userRoutes.get("",ensureTokenIsValidMiddleware,ensureIsAdmin,listAllUsers)
userRoutes.patch("/:id",ensureDataIsValidMiddleware(userUpdateSchema),ensureUserExistMiddleware,ensureTokenIsValidMiddleware,verifyAdminOrOwner,updateUser)
userRoutes.delete("/:id",ensureUserExistMiddleware,ensureTokenIsValidMiddleware,ensureIsAdmin,deleteUser)

export default userRoutes