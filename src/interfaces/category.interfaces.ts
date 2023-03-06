import { z } from "zod";
import {
  categorySchemas,
  returnArrayCategory,
  returnCategorySchemas,
} from "../schemas/category.schemas";

type ICategory = z.infer<typeof categorySchemas>;
type IReturnCategory = z.infer<typeof returnCategorySchemas>;
type IReturnCategoryArray = z.infer<typeof returnArrayCategory>;

export { ICategory, IReturnCategory, IReturnCategoryArray };
