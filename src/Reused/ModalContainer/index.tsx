import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import Loader from "./Loader"
import { useCloseDirty } from "./hooks"
import DirtyConfirm from "./DirtyConfirm"
import { useAppSelector } from "shared/store/hooks"
import { MODAL_REGISTRY } from "shared/modalRegistry"

const ModalContainer = () => {
  const { type, props, isGlobalLoading } = useAppSelector((state) => state.modal)
  
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isDirtyRef = useRef<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const pendingActionRef = useRef<(() => void) | null>(null)

  // 1. Извлекаем конфигурацию стабильно
  const currentModalConfig = useMemo(() => {
    return type ? MODAL_REGISTRY[type] : null
  }, [type])

  // 2. Стабилизируем ссылку на функцию, чтобы дочерний компонент не перерендеривался
  const setDirty = useCallback((isDirty: boolean) => {
    isDirtyRef.current = isDirty
  }, [])

  // 3. Синхронизация состояния с нативным <dialog>
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    // Проверяем наличие конфигурации, чтобы не открывать пустой диалог
    const hasContent = type && currentModalConfig

    if (hasContent || isGlobalLoading) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
      isDirtyRef.current = false
      setShowConfirm(false)
      pendingActionRef.current = null
    }
  }, [type, currentModalConfig, isGlobalLoading])

  const { handleNativeCancel, handleCloseRequest } = useCloseDirty(
    isDirtyRef, 
    pendingActionRef, 
    setShowConfirm
  )

  // Получаем параметры стиля (компонент ВСЕГДА рендерит обертку, чтобы избежать скачков DOM)
  const ActiveComponent = currentModalConfig?.component
  const maxWidth = currentModalConfig?.maxWidth || 'max-w-md'
  const responsiveStyle = currentModalConfig?.responsiveStyle || ''

  return (
    <dialog 
      ref={dialogRef} 
      className={`modal backdrop:blur-xs backdrop:brightness-75 transition-all duration-300 ${responsiveStyle}`} 
      onCancel={handleNativeCancel}
    >
      {isGlobalLoading && <Loader />}
      
      {type && ActiveComponent && (
        <div className={`modal-box w-full bg-base-100 p-4 shadow-lg border border-base-200/50 rounded-sm transition-all ${maxWidth}`}>
          <button 
            onClick={handleCloseRequest} 
            type="button" 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10" 
            disabled={isGlobalLoading}
          >
            ✕
          </button>
          
          {showConfirm && (
            <DirtyConfirm 
              isDirtyRef={isDirtyRef} 
              pendingActionRef={pendingActionRef} 
              setShowConfirm={setShowConfirm} 
            />
          )}
          
          {/* Передаем стабильную функцию setDirty */}
          <ActiveComponent 
            props={props} 
            onClose={handleCloseRequest} 
            setDirty={setDirty} 
          />
        </div>
      )}
      
      <div className="modal-backdrop" onClick={handleCloseRequest}>
        <button type="button">close</button>
      </div>
    </dialog>
  )
}

export default ModalContainer
