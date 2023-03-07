import { z } from "zod";

const schedulesSchemas = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int(),
});

const returnResultSchedules = schedulesSchemas.omit({realEstateId:true})

const returnSchedulesSchemas = schedulesSchemas.extend({
  id: z.number(),
  userId: z.number(),
});

export { schedulesSchemas, returnSchedulesSchemas,returnResultSchedules };
