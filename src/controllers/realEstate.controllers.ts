import { Request, Response } from "express";
import { IRealEstate } from "../interfaces/realEstate.interfaces";
import { createRealEstate } from "../services/realEstate/createRealEstate.service";
import listRealEstateService from "../services/realEstate/listRealEstate.service";

const createRealEstateController = async (req: Request, res: Response) => {
  const realEstateData: IRealEstate = req.body;

  const newEstate = await createRealEstate(realEstateData);

  return res.status(201).json(newEstate);
};

const listAllRealEstate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate = await listRealEstateService();

  return res.json(realEstate);
};

export { createRealEstateController, listAllRealEstate };
