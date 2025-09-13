import express from "express";
import cors from "cors";

import authRoutes from "../src/routes/auth.route.ts";
import userRoutes from "../src/routes/user.route.ts";
import educationRoutes from "../src/routes/education.route.ts";
import experienceRoutes from "../src/routes/experience.route.ts";
import categoryRoutes from "./routes/category.route.ts";
import techStackRoutes from "./routes/techstack.route.ts";
import projectRoutes from "./routes/project.route.ts";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// API ROutes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/techstacks", techStackRoutes);
app.use("/api/projects", projectRoutes);


export default app;
