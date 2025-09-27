import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import morgan from "morgan";

import authRoutes from "../src/routes/auth.route.ts";
import userRoutes from "../src/routes/user.route.ts";
import educationRoutes from "../src/routes/education.route.ts";
import experienceRoutes from "../src/routes/experience.route.ts";
import categoryRoutes from "./routes/category.route.ts";
import techStackRoutes from "./routes/techstack.route.ts";
import projectRoutes from "./routes/project.route.ts";
import newsRoutes from "./routes/news.route.ts";
import testimonialRoute from "./routes/testimonial.route.ts";
import notificationRoute from "./routes/notification.route.ts";
import visitRoutes from "./routes/visit.route.ts";
import dashboardRoutes from "./routes/dashboard.route.ts";

import { arcjetProtection } from "./middlewares/arcjetProtection.middleware.ts";
import { logVisit } from "./middlewares/visit.middleware.ts";

const app = express();

// // Custom token for IP
// morgan.token("client-ip", (req) => {
//   return (req.headers['x-forwarded-for']?.split(',').shift()) || req.socket.remoteAddress;
// });

// // Custom token for user-agent
// morgan.token("user-agent", (req) => {
//   return req.headers['user-agent'] || "Unknown";
// });

// // Custom log format
// export const logFormat = '[:date[iso]] :client-ip :method :url :user-agent';

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001" ], // your frontend URL
    credentials: true,
  })
);
app.use(logVisit);
app.use(arcjetProtection); // Apply Arcjet protection middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API ROutes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/techstacks", techStackRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/testimonials", testimonialRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/visits", visitRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

export default app;
