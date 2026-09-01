import { closeModalFn } from "./utils"
import { useAppSelector } from "shared/store/hooks"

export const useCloseDirty = (
  isDirtyRef: React.RefObject<boolean>,
  pendingActionRef: React.RefObject<(() => void) | null>,
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>,

) => {
  const { isLoading } = useAppSelector((state) => state.modal)

  const processCloseRequest = (proceedAction: () => void) => {
    if (isLoading) {
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
      closeModalFn()
    })
  }

  const handleCloseRequest = () => {
    processCloseRequest(() => {
      closeModalFn()
    })
  }

  return { handleNativeCancel, handleCloseRequest }
}
