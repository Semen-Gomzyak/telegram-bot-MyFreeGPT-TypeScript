import { Request, Response, NextFunction } from "express";
import modelSchema from "../../models";

const userRegistration = async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
  const { username } = req.body;

  const storedUser = await modelSchema.User.findOne({ username });

  if (storedUser) {
    return res.status(409).json("User already registered");
  }

  const createdUser = await modelSchema.User.create(req.body);
  res.status(201).json(createdUser);
};

export default userRegistration;

