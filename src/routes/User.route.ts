import { Router } from "express";
import { getUsers } from "../controllers/User.controller";
import { query, validationResult } from "express-validator";

const router = Router();

router.get("/", query("user").isNumeric(), getUsers);

export default router;
