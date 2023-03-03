import { z } from "zod";

const userSchemas = z.object({
  name: z.string().min(2).max(45),
  email: z.string(),
  password: z.string(),
  admin: z.boolean().nullish(),
});

const returnUserSchemaWithId = userSchemas.extend({
  id: z.number(),
});

const returnUserSchemaComplet = returnUserSchemaWithId
  .extend({
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
  })
  .omit({ password: true });

const userUpdateSchemaWithOutPartial = z.object({
  name: z.string().min(2).max(45),
  email: z.string(),
  password: z.string(),
});

const userUpdateSchema = userUpdateSchemaWithOutPartial.partial()

const returnArrayUsers = returnUserSchemaComplet.array();

export {
  userSchemas,
  returnUserSchemaComplet,
  returnUserSchemaWithId,
  returnArrayUsers,
  userUpdateSchema,
};
