import { z } from "zod";

const categorySchemas = z.object({
  name: z.string(),
});
const returnCategorySchemas = categorySchemas.extend({ id: z.number() });

const arrayOfImovel = z.object({
  id:z.number(),
  value: z.preprocess((val) => Number(val), z.number()),
  size: z.number().int().positive(),
  sold: z.boolean(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string())
})

const returnAllEstateAndCategory = z.object({
  id:z.number(),
  name:z.string(),
})

const returnResultAllEstateAndCategory = returnAllEstateAndCategory.extend({
  realEstate: z.array(arrayOfImovel) 
  
})

const returnArrayCategory = returnCategorySchemas.array();

export { categorySchemas,returnAllEstateAndCategory, returnCategorySchemas, returnArrayCategory,returnResultAllEstateAndCategory };
