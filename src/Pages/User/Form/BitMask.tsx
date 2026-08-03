import { useEffect } from 'react'

import { useBitMask } from './hooks'
import BitMaskList from './BitMaskList'
import AlertModal from 'Reused/AlertModal'
import BitMaskControls from './BitMaskControls'
import { useTranslate } from 'shared/i18n/hooks'
import type { ModalPropsMap } from 'shared/store/modalSlice'
import { FormProvider } from 'react-hook-form'

type Props = {
  props: ModalPropsMap['BITMASK'];
  setDirty: (isDirty: boolean) => void;
  onClose: () => void;
}

const BitMask = ({ props: { user }, setDirty, onClose }: Props) => {
  const { methods, isAlert, onSubmit } = useBitMask(user, setDirty)
  const { formState: { isDirty } } = methods

  useEffect(() => {
    setDirty(isDirty)

    return () => setDirty(false)
  }, [isDirty]);

  const __ = useTranslate()

  if (isAlert) {
    const alertProps = {
      title: 'Yes!',
      message: 'Data saved successfully',
      type: 'success',
    } as const

    return (
      <AlertModal
        props={alertProps}
        onClose={onClose}
      />
    )
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="p-4 border border-base-200"
      >
        <div className="fieldset">
          <h2 className="card-title text-xl mb-1 text-base-content">Settings admin rights</h2>
          <h3 className="text-center">{isDirty ? <span className="text-warning">
            {__('Unsaved')}
          </span> : '\u00a0'}
          </h3>
          <BitMaskList />
          <BitMaskControls __={__} />
        </div>
      </form>
    </FormProvider>
  )
}

export default BitMask
