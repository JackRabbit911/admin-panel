import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { api } from "shared/api"
import { getUsersUrl } from "shared/constants"
import { useAppDispatch } from "shared/store/hooks"
import { bitsToNumber, numberToBits } from "../utils"
import { createMutationHook } from "shared/hooks/createHooks"
import { bitmaskPageSchema, type MaskFormValues } from "./schema"

import type { User } from "Pages/Users/types"

type SetDirty = (isDirty: boolean) => void;


export const useBitMask = (user: User, setDirty: SetDirty) => {
  const url = [getUsersUrl, String(user.id), 'save'].join('/')
  const useUserRoleMutation = createMutationHook(url)

  const [isAlert, setIsAlert] = useState(false)
  const dispatch = useAppDispatch()
  const [save, { isLoading }] = useUserRoleMutation()

  const methods = useForm<MaskFormValues>({
    resolver: zodResolver(bitmaskPageSchema),
    mode: "onChange",
    defaultValues: {
      bits: numberToBits(Number(user.role))
    },
  })

  const { handleSubmit, formState: { isDirty } } = methods

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setDirty(isDirty)
    })

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [isDirty, setDirty])

  const onSubmit = handleSubmit(async (data: MaskFormValues) => {
    const newRole = bitsToNumber(data.bits)

    await save({ user_id: user.id, role: newRole })

    dispatch(
      api.util.invalidateTags(['users'])
    )

    setDirty(false)
    setIsAlert(true)
  })

  return { methods, isAlert, isLoading, onSubmit, isDirty }
}
