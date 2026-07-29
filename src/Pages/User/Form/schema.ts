import { z } from 'zod'

export const bitmaskPageSchema = z.object({
  bits: z
    .array(z.boolean())
    .length(8, 'Маска должна состоять ровно из 8 бит')
    // .refine((bits) => bits.some(Boolean), {
    //   message: 'Выберите хотя бы один активный бит',
    // }),
})

export type MaskFormValues = z.infer<typeof bitmaskPageSchema>
