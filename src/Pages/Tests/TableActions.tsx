import type { ActionType } from './utils';
import { ModalUtils } from 'Reused/ModalContainer/utils';

type Props = {
  tables: string[];
  isSubmitting: boolean;
  isDisabled: boolean;
}

export const TableActions = ({ tables, isSubmitting, isDisabled }: Props) => {
  const isBtnDisabled = isSubmitting || isDisabled

  const onDump = () => ModalUtils.open('BACKUP', { tables })
  const onAction = (action: ActionType) => {
    ModalUtils.open('CONFIRM', {
      payload: { tables: tables },
      actionType: action,
    })
  }

  return (
    <div className="card-actions justify-center gap-2 mt-6 pt-4 border-t border-base-200">
      <button
        type="button"
        disabled={isBtnDisabled}
        className="btn btn-outline btn-primary dark:btn-info"
        onClick={() => onDump()}
      >
        {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : null}
        Создать дамп (Dump)
      </button>

      <button
        type="button"
        disabled={isBtnDisabled}
        className="btn btn-outline btn-warning"
        onClick={() => onAction('truncate')}
      >
        {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : null}
        Очистить (Truncate)
      </button>

      <button
        type="button"
        disabled={isBtnDisabled}
        className="btn btn-outline btn-error"
        onClick={() => onAction('drop')}
      >
        {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : null}
        Удалить (Drop)
      </button>
    </div>
  );
};
