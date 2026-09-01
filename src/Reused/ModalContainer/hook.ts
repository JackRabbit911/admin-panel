import { useAppDispatch } from "shared/store/hooks"
import { openModal, type ModalPropsMap, type ModalType } from "shared/store/modalSlice"

export const useModal = (type: ModalType, props: ModalPropsMap[typeof type] = {}) => {
    const dispatch = useAppDispatch()

    return () => {dispatch(
        openModal({
            type: type,
            props: props,
        })
    )}
}
