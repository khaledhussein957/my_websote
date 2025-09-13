import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Generic function to create multer storage with dynamic folder
const createStorage = (folder: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join("src", "uploads", folder);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  });

// ✅ Profile picture uploader
export const uploadProfile = multer({
  storage: createStorage("profile-pictures"),
});

// ✅ Tech stack icon uploader
export const uploadTechStackIcon = multer({
  storage: createStorage("techstack-icons"),
});

// ✅ Project image uploader
export const uploadProjectImage = multer({
  storage: createStorage("projects"),
});

// ✅ Blog image uploader
export const uploadBlogImage = multer({
  storage: createStorage("blogs"),
});