import { Router } from "express";
import { createRealEstateController, listAllRealEstate } from "../controllers/realEstate.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureIsAdmin from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { realEstateSchema } from "../schemas/realEstate.schemas";

const realEstateRoutes:Router = Router()

realEstateRoutes.post("",ensureTokenIsValidMiddleware,ensureIsAdmin,ensureDataIsValidMiddleware(realEstateSchema),createRealEstateController)
realEstateRoutes.get("",listAllRealEstate)

export default realEstateRoutes