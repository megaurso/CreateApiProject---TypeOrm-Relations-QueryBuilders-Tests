import { Request, Response } from "express";
import {
  IReturnSchedules,
  ISchedules,
} from "../interfaces/schedules.interfaces";
import { createSchedules } from "../services/schedules/createSchedules.service";
import listAllSchedules from "../services/schedules/listAllSchedules.service";

const createSchedulesController = async (req: Request, res: Response) => {
  const userDate: ISchedules = req.body;
  const userId: number = req.user.id;
  const newDate: IReturnSchedules = await createSchedules(userDate, userId);
  return res.status(201).json(newDate);
};


const listAllSchedulesController =async (req: Request, res: Response):Promise<Response> => {
  const id:number = +req.params.id
  const newResult = await listAllSchedules(id)
  return res.json(newResult)
}

export { createSchedulesController,listAllSchedulesController };
