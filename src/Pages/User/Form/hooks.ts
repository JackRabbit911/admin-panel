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
        defaultValues: { bits: numberToBits(Number(user.role)) },
    })

    const { handleSubmit, formState: { isDirty }} = methods

    const onSubmit = handleSubmit(async (data: MaskFormValues) => {
        try {
            const newRole = bitsToNumber(data.bits)

            await save({
                url: [getUsersUrl, String(user.id), 'save'].join('/'),
                body: {
                    user_id: user.id,
                    role: newRole,
                }
            })

            const args = { url: [getUsersUrl, user.id].join('/') }
            dispatch(
                api.util.updateQueryData('get', args, (draft) => {
                    draft.result.role = newRole
                })
            )

            if (setDirty) {
                setDirty(false)
            }

            setIsAlert(true)
        } catch (error) {
            console.error('Error:', error)
        }
    })

    useEffect(() => {
        setDirty(isDirty)

        return () => {
            setDirty(false)
        }
    }, [isDirty]);

    return { methods, isAlert, isLoading, onSubmit }
}
