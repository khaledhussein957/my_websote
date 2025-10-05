// import express from "express";

// import {
//   getTechStacks,
//   createTechStack,
//   updateTechStack,
//   deleteTechStack,
// } from "../controllers/techstach.controller";

// import { authMiddleware } from "../middlewares/protectRoute";
// import {uploadTechStackIcon} from "../middlewares/upload";
// import {
//   validateTechStack,
//   validateTechStackUpdate,
// } from "../middlewares/techstackValidate.middleware";

// const router = express.Router();

// router.get("/", getTechStacks);
// router.post("/", authMiddleware, uploadTechStackIcon.single("image"), validateTechStack, createTechStack);
// router.put("/:id", authMiddleware, uploadTechStackIcon.single("image"), validateTechStackUpdate, updateTechStack);
// router.delete("/:id", authMiddleware, deleteTechStack);

// export default router;