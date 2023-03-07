import { z } from "zod";
import {
  returnResultSchedules,
  returnSchedulesSchemas,
  schedulesSchemas,
} from "../schemas/schedules.schemas";

type ISchedules = z.infer<typeof schedulesSchemas>;

type IReturnSchedules = z.infer<typeof returnSchedulesSchemas>;

type IReturnResult = z.infer<typeof returnResultSchedules>

export { ISchedules, IReturnSchedules,IReturnResult };
