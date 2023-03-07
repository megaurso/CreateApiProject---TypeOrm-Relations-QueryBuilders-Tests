import { Router } from "express";
import { createCategoryController, listAllCategoryController, listAllIMoveisCategoryController } from "../controllers/category.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureIsAdmin from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { categorySchemas } from "../schemas/category.schemas";

const categoryRoutes: Router = Router()

categoryRoutes.post("",ensureTokenIsValidMiddleware,ensureIsAdmin,ensureDataIsValidMiddleware(categorySchemas),createCategoryController)
categoryRoutes.get("/:id/realEstate",listAllIMoveisCategoryController)
categoryRoutes.get("",listAllCategoryController)

export default categoryRoutes