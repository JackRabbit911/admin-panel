import React from 'react';
import type { ModalType } from './store/modalSlice'
import BitMask from 'Pages/User/Form/BitMask';
import AlertModal from 'Reused/AlertModal';

interface ModalConfig {
  component: React.ComponentType<any>;
  /** Классы ширины Tailwind v4 (например: 'max-w-md', 'max-w-2xl', 'max-w-5xl') */
  maxWidth: string;
  /** Поведение на мобилках: '' (обычное) или 'modal-bottom sm:modal-middle' (шторка снизу) */
  responsiveStyle?: string;
}

export const MODAL_REGISTRY: Record<ModalType, ModalConfig> = {
    ALERT: {
        component: AlertModal,
        maxWidth: 'max-w-sm',
    },
    BITMASK: {
        component: BitMask,
        maxWidth: 'max-w-sm',
    }

//   CREATE_USER: {
//     component: CreateUserModal,
//     maxWidth: 'max-w-md', // Стандартный размер
//     responsiveStyle: 'modal-bottom sm:modal-middle', // На смартфонах будет выезжать снизу
//   },
//   DELETE_CONFIRM: {
//     component: DeleteConfirmModal,
//     maxWidth: 'max-w-sm', // Компактное окно для алертов
//   },
//   EDIT_PROFILE: {
//     component: EditProfileModal,
//     maxWidth: 'max-w-2xl', // Широкое окно для детальной формы
//     responsiveStyle: 'modal-bottom sm:modal-middle',
//   },
}
