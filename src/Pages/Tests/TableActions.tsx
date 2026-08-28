import { useAppDispatch } from 'shared/store/hooks';
import { openModal } from 'shared/store/modalSlice';
import type { ActionType } from './utils';

type Props = {
  tables: string[];
  isSubmitting: boolean;
  isDisabled: boolean;
}

export const TableActions = ({ tables, isSubmitting, isDisabled }: Props) => {
  const dispatch = useAppDispatch()
  const isBtnDisabled = isSubmitting || isDisabled

  const onDump = () => {
    dispatch(
      openModal({
        type: 'BACKUP',
        props: { tables },
      })
    )
  }

  const onAction = (action: ActionType) => {
    dispatch(
      openModal({
        type: 'CONFIRM',
        props: {
          payload: { tables: tables },
          actionType: action,
        },
      })
    )
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
