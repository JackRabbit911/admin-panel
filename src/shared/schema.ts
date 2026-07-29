import { z } from 'zod'
import { bitmaskPageSchema } from 'Pages/User/Form/schema';

export const masterSchema = z.object({
  maskPage: bitmaskPageSchema,
});

export type MasterFormValues = z.infer<typeof masterSchema>

