import { Router } from "express";
import { createSchedulesController, listAllSchedulesController } from "../controllers/schedules.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureIsAdmin from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { schedulesSchemas } from "../schemas/schedules.schemas";

const schedulesRoutes:Router = Router()

schedulesRoutes.post("",ensureTokenIsValidMiddleware,ensureDataIsValidMiddleware(schedulesSchemas),createSchedulesController)
schedulesRoutes.get("/realEstate/:id",ensureTokenIsValidMiddleware,ensureIsAdmin,listAllSchedulesController)

export default schedulesRoutes