import { Request, Response } from "express";
import { IReturnCategory } from "../interfaces/category.interfaces";
import { createCategory } from "../services/category/createCategory.service";
import { listCategory } from "../services/category/listAllCategoy.service"
import { listCategoryImoveis } from "../services/category/listImoveisCategory.service";

const createCategoryController = async (req: Request, res: Response) => {
  const userData: IReturnCategory = req.body;
  const newUser: IReturnCategory = await createCategory(userData);

  return res.status(201).json(newUser);
};

const listAllCategoryController = async (req: Request, res: Response) => {
  const categorys = await listCategory();
  return res.json(categorys);
};

const listAllIMoveisCategoryController =async (req: Request, res: Response) => {
  const userId = +req.params.id

  const result = await listCategoryImoveis(userId)
  
  return res.json(result)
}

export { createCategoryController,listAllCategoryController,listAllIMoveisCategoryController };
