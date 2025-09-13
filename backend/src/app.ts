import express from "express";
import cors from "cors";

import authRoutes from "../src/routes/auth.route.ts";
import userRoutes from "../src/routes/user.route.ts";
import educationRoutes from "../src/routes/education.route.ts";
import experienceRoutes from "../src/routes/experience.route.ts";
import categoryRoutes from "./routes/category.route.ts";
import techStackRoutes from "./routes/techstack.route.ts";
import projectRoutes from "./routes/project.route.ts";
import newsRoutes from "./routes/news.route.ts";

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      'http://localhost:3000',  // Next.js dashboard
      'http://localhost:3001',  // Alternative dashboard port
      'http://localhost:8000',  // Alternative dashboard port
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With", 
      "Content-Type", 
      "Accept", 
      "Authorization",
      "Cache-Control"
    ],
    credentials: true,
  })
);
app.use(express.json());

// API ROutes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/techstacks", techStackRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/news", newsRoutes);

export default app;
