import { closeModal } from "shared/store/modalSlice"
import { useAppDispatch, useAppSelector } from "shared/store/hooks"

export const useCloseDirty = (
  isDirtyRef: React.RefObject<boolean>,
  pendingActionRef: React.RefObject<(() => void) | null>,
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>,

) => {
  const dispatch = useAppDispatch()
  const { isGlobalLoading } = useAppSelector((state) => state.modal)

  const processCloseRequest = (proceedAction: () => void) => {
    if (isGlobalLoading) {
      return
    }

    if (isDirtyRef.current) {
      pendingActionRef.current = proceedAction
      setShowConfirm(true)
    } else {
      proceedAction()
    }
  }

  const handleNativeCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault()
    processCloseRequest(() => {
      dispatch(closeModal())
    })
  }

  const handleCloseRequest = () => {
    processCloseRequest(() => {
      dispatch(closeModal())
    })
  }

  return { handleNativeCancel, handleCloseRequest }
}
