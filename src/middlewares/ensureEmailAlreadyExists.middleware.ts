import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const ensureEmailAlreadyExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  if (req.body.email) {
    const findEmail = await userRepo.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (findEmail) {
      throw new AppError("Email already exists.", 409);
    }
  }

  return next();
};

export default ensureEmailAlreadyExist;
