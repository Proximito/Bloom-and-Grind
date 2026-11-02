// Server-side validation schemas (A10). Every API input goes through one of these.
import { z } from "zod";

export const PAGE_SIZE = 24; // A1: at most 24 products per page

export const catalogQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(1000).catch(1),
  q: z.string().trim().max(100).optional().catch(undefined),
  category: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .max(60)
    .optional()
    .catch(undefined),
});
export type CatalogQuery = z.infer<typeof catalogQuerySchema>;

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must have at least 2 characters").max(80),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address")),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(72, "Password must have at most 72 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  password: z.string().min(1).max(72),
});
