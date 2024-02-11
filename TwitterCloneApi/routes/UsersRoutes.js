import UserRepository from "../repositories/UserRepository.js";
import { authenticateToken } from "../services/AuthService.js";
import { withErrorHandling } from "./RouteUtils.js";
import express from "express";

const router = express.Router();

router.use(authenticateToken);

router.get(
  "/",
  withErrorHandling((req, res) => {
    const users = UserRepository.getAllUsers();
    return res.status(200).send(users);
  })
);

export default router;
