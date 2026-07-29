import React, { useEffect, useRef, Suspense } from 'react'
import { MODAL_REGISTRY } from 'shared/modalRegistry';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { closeModal } from 'shared/store/modalSlice';

export const ModalContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { type, props } = useAppSelector((state) => state.modal);
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  // Храним статус "загрязненности" формы, чтобы не вызывать лишних рендеров контейнера
  const isDirtyRef = useRef<boolean>(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (type) {
      dialog.showModal();
    } else {
      dialog.close();
      isDirtyRef.current = false;
    }
  }, [type]);

  // Функция проверки: можно ли закрыть окно?
  const canClose = (): boolean => {
    if (isDirtyRef.current) {
      return window.confirm('У вас есть несохраненные изменения. Вы уверены, что хотите выйти?');
    }
    return true;
  };

  // 1. Защита от нажатия клавиши ESC (нативное событие cancel)
  const handleNativeCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    if (!canClose()) {
      e.preventDefault(); // Блокируем нативное закрытие браузером
    }
  };

  // Срабатывает, когда dialog успешно закрылся нативным путем
  const handleNativeClose = () => {
    if (type) dispatch(closeModal());
  };

  // 2. Защита кнопки-крестика и клика по бэкдропу
  const handleCloseRequest = () => {
    if (canClose()) {
      dispatch(closeModal());
    }
  };

  if (!type) return null;

  const currentModalConfig = MODAL_REGISTRY[type];
  if (!currentModalConfig) return null;

  const { component: ActiveComponent, maxWidth, responsiveStyle = '' } = currentModalConfig;

  return (
    <dialog 
      ref={dialogRef} 
      className={`modal backdrop:blur-xs backdrop-brightness-75 transition-all duration-300 ${responsiveStyle}`}
      onCancel={handleNativeCancel} // Перехват ESC
      onClose={handleNativeClose}
    >
      <div className={`modal-box w-full bg-base-100 p-4 shadow-lg border border-base-200/50 rounded-sm transition-all ${maxWidth}`}>
        
        {/* Кнопка закрытия (крестик) */}
        <button 
          onClick={handleCloseRequest}
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0 z-10"
        >
          ✕
        </button>
        
        <Suspense fallback={<div className="py-8 text-center"><span className="loading loading-spinner text-primary"></span></div>}>
          {ActiveComponent && (
            <ActiveComponent 
              props={props} 
              onClose={handleCloseRequest}
              setDirty={(isDirty: boolean) => { isDirtyRef.current = isDirty; }} 
            />
          )}
        </Suspense>
      </div>
      
      <div className="modal-backdrop" onClick={handleCloseRequest}>
        <button type="button">close</button>
      </div>
    </dialog>
  );
};
