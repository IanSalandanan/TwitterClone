import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import AuthService from "../services/AuthService.js";
import PostRepository from "../repositories/PostRepository.js";
import {
  isUndefinedOrEmpty,
  validateRequiredField,
  withErrorHandling,
} from "./RouteUtils.js";

const router = express.Router();

router.post(
  "/login",
  withErrorHandling((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    validateRequiredField(username, "'username' field in body is required");
    validateRequiredField(password, "'password' field in body is required");

    const authResult = AuthService.authorizeUser(username, password);
    if (authResult.success) {
      return res.status(200).send(authResult.token);
    } else {
      return res.status(401).send("Unauthorized");
    }
  })
);

router.post(
  "/register",
  withErrorHandling((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    validateRequiredField(username, "'username' field in body is required");
    validateRequiredField(password, "'password' field in body is required");

    UserRepository.createUser(username);
    AuthService.registerUser(username, password);
    PostRepository.initializePosts(username);

    return res.status(201).send("User created");
  })
);

export default router;
