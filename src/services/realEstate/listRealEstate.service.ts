import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { IReturnArray } from "../../interfaces/realEstate.interfaces";
import { returnArrayRealEstate } from "../../schemas/realEstate.schemas";

const listRealEstateService = async (): Promise<IReturnArray> => {
  const RealEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstateRepo = await RealEstateRepo.find({
    relations: {
      address: true,
    },
  });

  const AllRealEstate = returnArrayRealEstate.parse(findRealEstateRepo);

  return AllRealEstate;
};

export default listRealEstateService;
