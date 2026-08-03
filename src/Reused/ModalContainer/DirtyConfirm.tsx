type Props = {
  isDirtyRef: React.RefObject<boolean>;
  pendingActionRef: React.RefObject<(() => void) | null>;
  setShowConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const DirtyConfirm = ({ isDirtyRef, pendingActionRef, setShowConfirm }: Props) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-base-100/95 backdrop-blur-xs p-6">
      <div className="text-center max-w-sm">
        <h3 className="text-lg font-bold text-error mb-2 flex items-center justify-center gap-2">
          ⚠️ Несохраненные изменения
        </h3>
        <p className="text-sm text-base-content/70 mb-6">
          У вас есть несохраненные изменения. Вы уверены, что хотите закрыть окно? Все внесенные данные будут потеряны.
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            className="btn btn-sm btn-outline border-base-300"
            onClick={() => { setShowConfirm(false); pendingActionRef.current = null; }}
          >
            Отмена
          </button>
          <button
            type="button"
            className="btn btn-sm btn-error text-white"
            onClick={() => {
              setShowConfirm(false);
              isDirtyRef.current = false; // Ломаем флаг блокировки, чтобы разрешить выход
              if (pendingActionRef.current) pendingActionRef.current();
            }}
          >
            Да, выйти
          </button>
        </div>
      </div>
    </div>
  )
}

export default DirtyConfirm
