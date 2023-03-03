import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { ILogin } from "../../interfaces/login.interfaces";
import "dotenv/config";
import { Repository } from "typeorm";

const createLoginService = async (loginData: ILogin): Promise<string> => {
  const userRepo:Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError("Wrong email or password", 401);
  }

  const passwrodMatch = await compare(loginData.password, user.password);
  if (!passwrodMatch) {
    throw new AppError("Wrong email or password", 401);
  }
  const token:string  = jwt.sign(
    {
    id: user.id,
    admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
        expiresIn: process.env.EXPIRES_IN,
        subject: String(user.id)
    }
  )
  return token
};

export default createLoginService;
