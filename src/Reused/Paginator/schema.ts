import { z } from 'zod';

export const filterSchema = z.object({
  search: z.string()
    .trim()
    .regex(/^[^<>]*$/, 'Invalid input!')
    .refine(
      (value) => value === '' || value.length > 3,
      { message: 'The search query is too short' }
    ),
  filter: z.string(),
});

export type FilterFormValues = z.infer<typeof filterSchema>;
