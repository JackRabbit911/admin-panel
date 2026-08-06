import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { getUsersUrl } from "shared/constants"
import { api, usePostMutation } from "shared/api"
import { useAppDispatch } from "shared/store/hooks"
import { bitsToNumber, numberToBits } from "../utils"
import { bitmaskPageSchema, type MaskFormValues } from "./schema"
import type { User } from "Pages/Users/types"

type SetDirty = (isDirty: boolean) => void;

export const useBitMask = (user: User, setDirty: SetDirty) => {
  const [isAlert, setIsAlert] = useState(false)
  const dispatch = useAppDispatch()
  const [save, { isLoading }] = usePostMutation()

  const methods = useForm<MaskFormValues>({
    resolver: zodResolver(bitmaskPageSchema),
    mode: "onChange",
    defaultValues: { 
      bits: numberToBits(Number(user.role)) 
    },
  })

  const { handleSubmit, formState: { isDirty } } = methods

  // Единая, безопасная синхронизация флага "грязной" формы
  useEffect(() => {
    // Используем requestAnimationFrame, чтобы не блокировать текущий кадр рендера формы
    const frameId = requestAnimationFrame(() => {
      setDirty(isDirty)
    })

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [isDirty, setDirty])

  const onSubmit = handleSubmit(async (data: MaskFormValues) => {
    try {
      const newRole = bitsToNumber(data.bits)
      
      await save({
        url: [getUsersUrl, String(user.id), 'save'].join('/'),
        body: { user_id: user.id, role: newRole }
      }).unwrap() // Используем .unwrap(), если нужно поймать ошибку в catch

      const args = { url: [getUsersUrl, user.id].join('/') }
      
      dispatch(
        api.util.updateQueryData('get', args, (draft) => {
          if (draft?.result) {
            draft.result.role = newRole
          }
        })
      )

      setDirty(false)
      setIsAlert(true)
    } catch (error) {
      console.error('Error saving bitmask:', error)
    }
  })

  return { methods, isAlert, isLoading, onSubmit, isDirty }
}
