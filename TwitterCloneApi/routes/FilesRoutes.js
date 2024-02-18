import express from "express";

import fs from "fs";
import path from "path";
const router = express.Router();

router.get("/", (req, res) => {
  const rootFolder =
    process.env.NODE_ENV === "development" ? "../TEMP" : "/tmp";
  const AUTH_FILE_PATH = path.join(rootFolder, "AUTH.json");
  const POSTS_FILE_PATH = path.join(rootFolder, "POSTS.json");
  const USERS_FILE_PATH = path.join(rootFolder, "USERS.json");

  const authFile = fs.existsSync(AUTH_FILE_PATH)
    ? fs.readFileSync(AUTH_FILE_PATH, "utf-8")
    : "File not found";
  const postsFile = fs.existsSync(POSTS_FILE_PATH)
    ? fs.readFileSync(POSTS_FILE_PATH, "utf-8")
    : "File not found";
  const usersFile = fs.existsSync(USERS_FILE_PATH)
    ? fs.readFileSync(USERS_FILE_PATH, "utf-8")
    : "File not found";

  return res.json({
    authFile: authFile,
    postsFile: postsFile,
    usersFile: usersFile,
  });
});

export default router;
