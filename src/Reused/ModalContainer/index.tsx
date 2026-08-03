import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "shared/store/hooks";
import { useCloseDirty } from "./hooks";
import Loader from "./Loader";
import DirtyConfirm from "./DirtyConfirm";
import { MODAL_REGISTRY } from "shared/modalRegistry";

const ModalContainer = () => {
  const { type, props, isGlobalLoading } = useAppSelector((state) => state.modal)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isDirtyRef = useRef<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const pendingActionRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    if (type || isGlobalLoading) {
      if (!dialog.open) dialog.showModal()
    } else {
      if (dialog.open) dialog.close()
      isDirtyRef.current = false
      setShowConfirm(false);
      pendingActionRef.current = null
    }
  }, [type, isGlobalLoading])

  const {
    handleNativeCancel,
    handleCloseRequest
  } = useCloseDirty(isDirtyRef, pendingActionRef, setShowConfirm)

  if (!type && !isGlobalLoading) {
    return null
  }

  const currentModalConfig = type ? MODAL_REGISTRY[type] : null;

  if (!currentModalConfig) {
    return null
  }

  const ActiveComponent = currentModalConfig?.component;
  const maxWidth = currentModalConfig?.maxWidth || 'max-w-md';
  const responsiveStyle = currentModalConfig?.responsiveStyle || '';

  return (
    <dialog
      ref={dialogRef}
      className={`modal backdrop:blur-xs backdrop:brightness-75 transition-all duration-300 ${responsiveStyle}`}
      onCancel={handleNativeCancel}
    >
      {isGlobalLoading && <Loader />}

      {type && (
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
          {ActiveComponent && (
            <ActiveComponent
              props={props}
              onClose={handleCloseRequest}
              setDirty={(isDirty: boolean) => {
                isDirtyRef.current = isDirty;
              }}
            />
          )}
        </div>
      )}
      <div className="modal-backdrop" onClick={handleCloseRequest}>
        <button type="button">close</button>
      </div>
    </dialog>
  )
}

export default ModalContainer
