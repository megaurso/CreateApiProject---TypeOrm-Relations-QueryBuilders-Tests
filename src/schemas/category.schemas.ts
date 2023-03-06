import { z } from "zod";

const categorySchemas = z.object({
  name: z.string(),
});
const returnCategorySchemas = categorySchemas.extend({ id: z.number() });

const returnArrayCategory = returnCategorySchemas.array();

export { categorySchemas, returnCategorySchemas, returnArrayCategory };
