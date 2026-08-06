import BitMaskList from './BitMaskList'
import AlertModal from 'Reused/AlertModal'
import BitMaskControls from './BitMaskControls'
import { useTranslate } from 'shared/i18n/hooks'
import type { ModalPropsMap } from 'shared/store/modalSlice'
import { FormProvider } from 'react-hook-form'
import { useBitMask } from './hooks'

type Props = {
  props: ModalPropsMap['BITMASK'];
  setDirty: (isDirty: boolean) => void;
  onClose: () => void;
}

const BitMask = ({ props: { user }, setDirty, onClose }: Props) => {
  // Получаем всё необходимое из хука, включая стабилизированный isDirty
  const { methods, isAlert, onSubmit, isDirty } = useBitMask(user, setDirty)
  const __ = useTranslate()

  if (isAlert) {
    const alertProps = {
      title: 'Yes!',
      message: 'Data saved successfully',
      type: 'success',
    } as const
    return <AlertModal props={alertProps} onClose={onClose} />
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="p-4 border border-base-200">
        <div className="fieldset">
          <h2 className="card-title text-xl mb-1 text-base-content">
            Settings admin rights
          </h2>
          
          {/* Текст предупреждения рендерится без создания пустых текстовых узлов */}
          <h3 className="text-center min-h-6">
            {isDirty && (
              <span className="text-warning animate-fade-in">
                {__('Unsaved')}
              </span>
            )}
          </h3>
          
          {/* Внутри этих компонентов элементы должны быть мемоизированы или использовать useWatch */}
          <BitMaskList />
          <BitMaskControls __={__} />
        </div>
      </form>
    </FormProvider>
  )
}

export default BitMask
