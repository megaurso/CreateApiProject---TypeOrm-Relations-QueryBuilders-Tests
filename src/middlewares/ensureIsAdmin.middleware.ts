import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authenticatedUser = req.user;

  if (authenticatedUser.admin === false) {
    throw new AppError("Insufficient permission", 403);
  }
  return next();
};

export default ensureIsAdmin;
