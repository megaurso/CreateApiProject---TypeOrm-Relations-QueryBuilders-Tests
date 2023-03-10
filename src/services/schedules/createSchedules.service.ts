import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import {
  IReturnSchedules,
  ISchedules,
} from "../../interfaces/schedules.interfaces";


const isWeekDay = (Thisdate: Date): boolean => {
  const day = Thisdate.getDay();
  return day !== 0 && day !== 6;
};

const createSchedules = async (
  userData: ISchedules,
  userId: number
): Promise<IReturnSchedules | any> => {
  const { date, hour, realEstateId } = userData;

  if (!isWeekDay(new Date(date))) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const visitHour = +hour.split(":")[0];
  if (visitHour < 8 || visitHour >= 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const getUser: Repository<User> = AppDataSource.getRepository(User);
  const getRealEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const visitRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule);

  const findUser = await getUser.findOneBy({
    id: userId,
  });
  if (!findUser) {
    throw new AppError("user not Found", 404);
  }

  const realEstate = await getRealEstateRepo.findOneBy({
    id: userData.realEstateId,
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const existVistSameHour = await visitRepo
    .createQueryBuilder("visit")
    .where("visit.realEstate = :realEstateId", { realEstateId })
    .andWhere("visit.date = :date", { date })
    .andWhere("visit.hour = :hour", { hour })
    .getOne();

  if (existVistSameHour) {
    throw new AppError("Schedule to this real estate at this date and time already exists", 409);
  }

  const existVist = await visitRepo
    .createQueryBuilder("visit")
    .where("visit.userId = :userId", { userId })
    .andWhere("visit.date = :date", { date })
    .andWhere("visit.hour = :hour", { hour })
    .getOne();

  if (existVist) {
    throw new AppError("User schedule to this real estate at this date and time already exists", 409);
  }

  const newSchedule = {
    date,
    hour,
    realEstate,
    user:findUser
  }

  const createSchedule = visitRepo.create(newSchedule);

  await visitRepo.save(createSchedule);

  return {message:"Schedule created"}
};

export { createSchedules };
