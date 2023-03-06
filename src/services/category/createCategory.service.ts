import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { IReturnCategory } from "../../interfaces/category.interfaces";
import { returnCategorySchemas } from "../../schemas/category.schemas";

const createCategory = async (
  userData: IReturnCategory
): Promise<IReturnCategory> => {
  const getRepo: Repository<Category> = AppDataSource.getRepository(Category);

  if (userData.name) {
    const findName = await getRepo.findOne({
      where: {
        name: userData.name,
      },
    });
    if (findName) {
      throw new AppError("Category already exists", 409);
    }
  }

  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = categoryRepo.create(userData);

  await categoryRepo.save(category);

  const newCategory: IReturnCategory = returnCategorySchemas.parse(category);

  return newCategory;
};

export { createCategory };
