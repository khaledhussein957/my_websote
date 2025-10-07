import { z } from "zod";

const projectTypeEnum = [
  "mobile",
  "fullstack",
  "frontend",
  "backend",
  "machine",
] as const;

export const createProjectSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(1000),
  githubUrl: z.string().url().optional(),
  type: z.enum(projectTypeEnum),
  liveDemoUrl: z.string().url().optional(),
  image: z
    .any()
    .optional()
    .transform((val) => {
      if (!val || (val instanceof FileList && val.length === 0)) return undefined;
      if (val instanceof FileList) return val;
      return val;
    }),
  techStack: z.array(z.string()),
  featured: z.boolean().default(false),
});

export const updateProjectSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  description: z.string().max(1000).optional(),
  githubUrl: z.string().url().optional(),
  type: z.enum(projectTypeEnum).optional(),
  liveDemoUrl: z.string().url().optional(),
  image: z
    .any()
    .optional()
    .transform((val) => {
      if (!val || (val instanceof FileList && val.length === 0)) return undefined;
      if (val instanceof FileList) return val;
      return val;
    }),
  techStack: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
});
