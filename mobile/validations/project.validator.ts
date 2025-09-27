import { z } from 'zod';

export const techStackSchema = z.object({
  name: z.string().min(2, 'Tech name is required'),
  category: z.string().min(2, 'Category is required'),
  proficiency: z.preprocess((val) => Number(val), z.number().min(1).max(10)),
  icon: z.string().url('Must be a valid URL').optional(),
});

export const projectSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  githubUrl: z.string().url('Invalid GitHub URL').optional(),
  liveDemoUrl: z.string().url('Invalid Live Demo URL').optional(),
  techStack: z.array(techStackSchema).min(1, 'At least one tech stack is required'),
  isFeatured: z.boolean(),
  image: z.string().url('Invalid image URL').optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
