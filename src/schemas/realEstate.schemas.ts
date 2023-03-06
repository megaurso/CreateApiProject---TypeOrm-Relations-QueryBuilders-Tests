import { z } from "zod";

const realEstateSchema = z.object({
  value: z.preprocess((val) => Number(val), z.number()),
  size: z.number().int().positive(),
  address: z.object({
    street: z.string(),
    zipCode: z.string().max(8),
    number: z.string().nullish(),
    city: z.string(),
    state: z.string().max(2),
  }),
  categoryId: z.number().int().optional(),
});

const returnEstateSchemaWithId = realEstateSchema.extend({
  id: z.number(),
});

const returnEstateSchemaComplet = returnEstateSchemaWithId.extend({
  sold: z.boolean(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

const returnRealEstateSchemaComplet = z.object({
  value: z.preprocess((val) => Number(val), z.number()),
  id:z.number(),
  size: z.number().int().positive(),
  address: z.object({
    id: z.number(),
    street: z.string(),
    zipCode: z.string().max(8),
    number: z.string().nullish(),
    city: z.string(),
    state: z.string().max(2),
  }),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  sold: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const returnArrayRealEstate = returnRealEstateSchemaComplet.omit({category:true}).array()

export {
  realEstateSchema,
  returnEstateSchemaComplet,
  returnEstateSchemaWithId,
  returnRealEstateSchemaComplet,
  returnArrayRealEstate
};
