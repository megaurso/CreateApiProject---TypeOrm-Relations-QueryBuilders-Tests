import { z } from "zod";

const userSchemas = z.object({
  name: z.string().min(2).max(45),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().nullish(),
});

const returnUserSchemaWithId = userSchemas.extend({
  id: z.number(),
});

const returnUserSchemaComplet = returnUserSchemaWithId
  .extend({
    createdAt: z.date().or(z.string()),
    updatedAt: z.date().or(z.string()),
    deletedAt: z.date().or(z.string()).nullable(),
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
