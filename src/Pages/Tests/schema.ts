import { z } from 'zod';

export const tableActionSchema = z.object({
  tables: z.array(z.string()).min(1, { message: 'Выберите хотя бы одну таблицу' }),
});

export type TableActionFormValues = z.infer<typeof tableActionSchema>;
