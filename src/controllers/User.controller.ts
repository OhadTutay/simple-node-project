import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getRepository } from "typeorm";
import User from "../models/User.entity";

const usersRepo = getRepository(User);

// Select all the users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw JSON.stringify(errors);
    }
    const allUsers = await usersRepo.find({});
    res.status(200).send(allUsers);
  } catch (e) {
    res.sendStatus(500);
  }
};
