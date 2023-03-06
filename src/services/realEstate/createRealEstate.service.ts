import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import {
  IRealEstate,
  IReturnResult,
} from "../../interfaces/realEstate.interfaces";
import { returnRealEstateSchemaComplet } from "../../schemas/realEstate.schemas";

const createRealEstate = async (
  userData: IRealEstate
): Promise<IReturnResult> => {
  const getRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const getAddresRepo: Repository<Address> =
    AppDataSource.getRepository(Address);

  const findAddress = await getAddresRepo.findOne({
    where: {
      street: userData.address.street,
      zipCode: userData.address.zipCode,
      city: userData.address.city,
      state: userData.address.state,
    },
  });

  if (findAddress) {
    throw new AppError("Address already exists", 409);
  }
  const createAddress = getAddresRepo.create(userData.address);

  await getAddresRepo.save(createAddress);

  let findCategory = null;

  if (userData.categoryId) {
    findCategory = await getRepo.findOne({
      where: {
        id: userData.categoryId,
      },
    });
  }

  const newRealEstateObj = {
    value: userData.value,
    size: userData.size,
    address: createAddress,
    category: findCategory!,
  };

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate = realEstateRepo.create(newRealEstateObj);

  await realEstateRepo.save(realEstate);
  const newRealEstate: IReturnResult =
  returnRealEstateSchemaComplet.parse(realEstate);

  return newRealEstate;
};
export { createRealEstate };
