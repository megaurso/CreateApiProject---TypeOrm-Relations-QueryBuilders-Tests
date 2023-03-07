import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, User } from "../../entities";
import { AppError } from "../../errors";

const listAllSchedules = async (userId: number) => {
  const userRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const userSchedules = userRepo
    .createQueryBuilder("realEstate")
    .select([
      "realEstate",
      "realEstateAddress",
      "realEstateCategory",
      "realEstateSchedule",
      "user",
    ])
    .innerJoin("realEstate.address", "realEstateAddress")
    .innerJoin("realEstate.category", "realEstateCategory")
    .innerJoin("realEstate.schedule", "realEstateSchedule")
    .innerJoin("realEstateSchedule.user", "user")
    .where("realEstate.id = :id", { id: userId })
    .getMany();

  if (!userSchedules) {
    throw new AppError("RealEstate not found", 404);
  }

  return userSchedules;
};

export default listAllSchedules;
