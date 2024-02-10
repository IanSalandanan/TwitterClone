import express from "express";

import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import authRoutes from "./routes/AuthRoutes.js";
import postsRoutes from "./routes/PostsRoutes.js";
import followersRoutes from "./routes/FollowersRoutes.js";
import openApiSpecs from "./docs/openapi.json" with { type: "json" };

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static("./docs"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpecs));

app.get("/api/", (req, res) => {
  res.send("Hello world. The API is up and running");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postsRoutes);
app.use("/api/v1/users", followersRoutes);

export default app;
