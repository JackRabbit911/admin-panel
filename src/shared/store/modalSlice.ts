import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from 'Pages/Users/types';

export type ModalType = 'ALERT' | 'BITMASK'

export interface ModalPropsMap {
  ALERT: { title: string; message: string; type: 'info' | 'success' | 'warning' },
  BITMASK: { adminRole: number, user: User },
}

interface ModalState {
  type: ModalType | null;
  props: ModalPropsMap[ModalType] | null;
}

const initialState: ModalState = {
  type: null,
  props: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: <T extends ModalType>(
      state: ModalState,
      action: PayloadAction<{ type: T; props: ModalPropsMap[T] }>
    ) => {
      state.type = action.payload.type;
      state.props = action.payload.props;
    },
    closeModal: (state) => {
      state.type = null;
      state.props = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
