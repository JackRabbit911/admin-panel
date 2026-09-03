import React from 'react';

import AlertModal from 'Reused/AlertModal';
import BitMask from 'Pages/User/Form/BitMask';
import ConfirmModal from 'Reused/ConfirmModal';
import BackupName from 'Pages/Develop/Database/Form/BacupName';
import type { ModalType } from './store/modalSlice'

interface ModalConfig {
  component: React.ComponentType<any>;
  maxWidth?: string;
  responsiveStyle?: string;
}

export const MODAL_REGISTRY: Record<ModalType, ModalConfig> = {
    ALERT: {
        component: AlertModal,
        maxWidth: 'max-w-sm',
        responsiveStyle: 'modal-bottom sm:modal-middle',
    },
    BITMASK: {
        component: BitMask,
        maxWidth: 'max-w-sm',
        responsiveStyle: 'modal-bottom sm:modal-middle',
    },
    CONFIRM: {
        component: ConfirmModal,
        maxWidth: 'max-w-sm',
    },
    BACKUP: {
        component: BackupName,
        maxWidth: 'max-w-sm',
    }
}
