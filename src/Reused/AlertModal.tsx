import { useTranslate } from 'shared/i18n/hooks';
import type { ModalPropsMap } from 'shared/store/modalSlice'

type Props = {
  props: ModalPropsMap['ALERT'];
  onClose: () => void;
}

const AlertModal = ({ props: {title = 'Yes!', type = 'success', message}, onClose }: Props) => {
  const __ = useTranslate()

  const alertStyles = {
    info: 'text-info border-info/20 bg-info/5',
    success: 'text-success border-success/20 bg-success/5',
    warning: 'text-warning border-warning/20 bg-warning/5',
  }

  return (
    <div className={`border p-4 rounded-sm flex flex-col gap-3 ${alertStyles[type]}`}>
      <h3 className="text-lg font-bold flex items-center gap-2">
        {type === 'success' && '✓'} 
        {__(title)}
      </h3>
      <p className="text-sm text-base-content/80">{__(message)}</p>
      <div className="modal-action mt-2">
        <button className="btn btn-sm btn-outline" onClick={onClose}>
          {__('Close')}
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
