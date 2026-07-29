import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { getUsersUrl, P } from 'shared/constants'
import { useTranslate } from 'shared/i18n/hooks'
import { useAppSelector } from 'shared/store/hooks'
import { bitsToNumber, checkBoxDisabled, numberToBits } from '../utils'
import type { ModalPropsMap } from 'shared/store/modalSlice'
import { bitmaskPageSchema, type MaskFormValues } from './schema'
import { usePostMutation } from 'shared/api'

type Props = {
  props: ModalPropsMap['BITMASK'];
  onClose?: () => void;
  setDirty?: (isDirty: boolean) => void;
}

const BitMask = ({ props: { user }, onClose, setDirty }: Props) => {
  const admin = useAppSelector((state) => state.user.user)
  const adminRole = +(admin?.role ?? 0)

  const { control, handleSubmit, reset, setValue, formState: { isDirty } } = useForm<MaskFormValues>({
    resolver: zodResolver(bitmaskPageSchema),
    mode: "onChange",
    defaultValues: { bits: numberToBits(Number(user.role)) },
  });

  const [save] = usePostMutation()

  const onSubmit = async (data: MaskFormValues) => {
    try {
      const response = await save({
        url: [getUsersUrl, String(user.id), 'save'].join('/'),
        body: {
          user_id: user.id,
          role: bitsToNumber(data.bits),
        }
      }).unwrap()

      const result = response.result
      console.log('response', response, result)

      if(setDirty) {
        setDirty(false)
      }

      if (onClose) {
        onClose()
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error)
    }
  }

  const onClear = () => {
    const zero = Array(8).fill(false) as boolean[]
    setValue('bits', zero, { shouldDirty: true })
  }

  useEffect(() => {
    if (setDirty) {
      setDirty(isDirty)
    }

    return () => {
      if (setDirty) {
        setDirty(false)
      }
    };
  }, [isDirty]);

  const __ = useTranslate()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card bg-base-100 shadow-xl max-w-2xl p-6 border border-base-200"
    >
      <div className="card-body p-0">
        <h2 className="card-title text-xl mb-1 text-base-content">Settings admin rights</h2>
        <h3 className="text-center">{isDirty ? <span className="text-warning">
          {__('Unsaved')}
        </span> : '\u00a0'}
        </h3>
        <div>
          {Object.entries(P).filter(([k, _]) => k !== 'ROOT').map(([label, value], index) => {
            return (
              <Controller
                key={label}
                name={`bits.${index}`}
                control={control}
                render={({ field }) => (
                  <label
                    className="fieldset-label flex justify-between mb-2"
                  >
                    {label}
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="checkbox checkbox-md my-1"
                      disabled={checkBoxDisabled(value, +(adminRole ?? 0))}
                    />
                  </label>
                )}
              />
            )
          })}
        </div>
        <div className="flex gap-2 w-full">
          <button
            type="button"
            onClick={onClear}
            className="grow btn btn-error"
          >
            {__('Clear')}
          </button>
          <button
            type="button"
            onClick={() => { reset() }}
            className="grow btn"
          >
            {__('Reset')}
          </button>
          <button
            type="submit"
            className="grow btn btn-primary dark:btn-info"
          >
            {__('Save')}
          </button>
        </div>
      </div>
    </form>
  )
}

export default BitMask
