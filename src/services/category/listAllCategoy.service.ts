import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { IReturnCategoryArray } from "../../interfaces/category.interfaces";
import { returnArrayCategory } from "../../schemas/category.schemas";

const listCategory = async (): Promise<IReturnCategoryArray> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategorys: IReturnCategoryArray = await categoryRepo.find();

  const allCategory = returnArrayCategory.parse(findCategorys);

  return allCategory;
};

export { listCategory };
