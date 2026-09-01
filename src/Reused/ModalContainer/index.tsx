import { useRef, useState, useCallback, useMemo } from "react"
import Loader from "./Loader"
import { ModalUtils } from "./utils"
import { useCloseDirty } from "./hooks"
import DirtyConfirm from "./DirtyConfirm"
import { useAppSelector } from "shared/store/hooks"
import { MODAL_REGISTRY } from "shared/modalRegistry"

const ModalContainer = () => {
  const { type, isLoading } = useAppSelector((state) => state.modal)

  // const dialogRef = useRef<HTMLDialogElement>(null)
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

  const { handleNativeCancel, handleCloseRequest } = useCloseDirty(
    isDirtyRef,
    pendingActionRef,
    setShowConfirm
  )

  // Получаем параметры стиля (компонент ВСЕГДА рендерит обертку, чтобы избежать скачков DOM)
  const ActiveComponent = currentModalConfig?.component
  const maxWidth = currentModalConfig?.maxWidth || 'max-w-md'
  const responsiveStyle = currentModalConfig?.responsiveStyle || ''
  const isOpen = Boolean(type)

  if (!type) {
    return null
  }

  return (
    <dialog
      open={isOpen}
      className={`modal backdrop:blur-xs backdrop:brightness-75 transition-all duration-300 ${responsiveStyle}`}
      onCancel={handleNativeCancel}
    >
      {isLoading && <Loader />}

      {type && ActiveComponent && (
        <div className={`modal-box w-full bg-base-100 p-4 shadow-lg border border-base-200/50 rounded-sm transition-all ${maxWidth}`}>
          <button
            onClick={handleCloseRequest}
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
            disabled={isLoading}
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
            props={ModalUtils.getProps()}
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
