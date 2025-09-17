import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  title: z.string().optional(),
  about_me: z.string().min(25).max(400).optional(),
})

export type ProfileSchema = z.infer<typeof profileSchema>