import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

const listAllSchedules = async (idUserEstate:number):Promise<RealEstate> => {
  const userRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const userSchedules:RealEstate | null = await userRepo
    .createQueryBuilder("realEstate")
    .select([
      "realEstate",
      "address",
      "category",
      "schedules",
      "user",
    ])
    .innerJoin("realEstate.address", "address")
    .innerJoin("realEstate.category", "category")
    .innerJoin("realEstate.schedules", "schedules")
    .innerJoin("schedules.user", "user")
    .where("realEstate.id = :id", { id: idUserEstate})
    .getOne();

  console.log(userSchedules,"osiafnhsdoi")

  if (!userSchedules) {
    throw new AppError("RealEstate not found", 404);
  }

  return userSchedules;
};

export default listAllSchedules;
