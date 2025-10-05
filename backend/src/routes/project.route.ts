// import express from "express";

// import { getProjects, createProject, updateProject, deleteProject } from "../controllers/project.controller";

// import { authMiddleware } from "../middlewares/protectRoute";
// import { createProjectValidate, updateProjectValidate } from "../middlewares/projectValidate.middleware";
// import { uploadProjectImage } from "../middlewares/upload";

// const router = express.Router();

// router.get("/", getProjects);
// router.post("/", authMiddleware, uploadProjectImage.single("image"), createProjectValidate, createProject);
// router.put("/:id", authMiddleware, uploadProjectImage.single("image"), updateProjectValidate, updateProject);
// router.delete("/:id", authMiddleware, deleteProject);

// export default router;