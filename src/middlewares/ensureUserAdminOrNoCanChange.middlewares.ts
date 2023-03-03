import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const verifyAdminOrOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authenticatedUser = req.user;

  if (authenticatedUser.admin === true) {
    return next();
  }
  if (authenticatedUser.id === +req.params.id) {
    return next();
  }
  if (
    authenticatedUser.admin === false ||
    authenticatedUser.id !== +req.params.id
  ) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default verifyAdminOrOwner;
