import express from "express";
import cors from "cors";

import authRoutes from "../src/routes/auth.route.ts";
import userRoutes from "../src/routes/user.route.ts";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// API ROutes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


export default app;
