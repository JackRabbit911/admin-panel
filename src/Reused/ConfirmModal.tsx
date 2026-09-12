import { usePostMutation } from "shared/api"
import { useTranslate } from "shared/i18n/hooks"
import { openModalFn } from "./ModalContainer/utils"
import { actionResolve } from "Pages/Develop/Database/utils"
import type { ModalPropsMap } from "shared/store/modalSlice"

type Props = {
  props: ModalPropsMap['CONFIRM'];
  onClose: () => void;
}

const ConfirmModal = ({ props, onClose }: Props) => {
  const { title, message, url, method, messageSuccess } = actionResolve(props.actionType || 'dump')
  const [save] = usePostMutation()
  const __ = useTranslate()

  const titleStr = props?.title || title
  const messageStr = props?.message || message

  const handleConfirm = async () => {
      await save({
        url: url,
        method: method || 'POST',
        body: props.payload,
      }).unwrap()
  
      onClose();

      openModalFn('ALERT', { message: messageSuccess })
  };
  
  return (
    <>
      <div className="border p-4 rounded-sm flex flex-col gap-3 text-warning border-warning/20 bg-warning/5">
        <h3 className="text-lg font-bold flex items-center gap-2">
          {__(titleStr)}
        </h3>
        <p className="text-sm text-base-content/80 wrap-break-word">{__(messageStr)}</p>
        <div className="modal-action mt-2 flex justify-center gap-4">
          <button className="btn btn-sm btn-outline" onClick={onClose}>
            {__(props.cancelText || 'Cancel')}
          </button>
          <button className="btn btn-sm btn-outline btn-primary dark:btn-info" onClick={handleConfirm}>
            {__(props.confirmText || 'Confirm')}
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmModal
