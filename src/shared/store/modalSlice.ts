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
  isGlobalLoading: boolean;
  loadingMessage: string | null;
}

const initialState: ModalState = {
  type: null,
  props: null,
  isGlobalLoading: false,
  loadingMessage: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: <T extends ModalType>(
      state: ModalState,
      action: PayloadAction<{ type: T; props: ModalPropsMap[T] }>
    ) => {
      state.type = action.payload.type
      state.props = action.payload.props
    },
    closeModal: (state) => {
      state.type = null
      state.props = null
    },
    setGlobalLoading: (
      state, 
      action: PayloadAction<boolean | { isActive: boolean; message?: string }>
    ) => {
      if (typeof action.payload === 'boolean') {
        state.isGlobalLoading = action.payload
        if (!action.payload) state.loadingMessage = null // Сбрасываем текст при выключении
      } else {
        state.isGlobalLoading = action.payload.isActive;
        state.loadingMessage = action.payload.message || null
      }
    },
  },
})

export const { openModal, closeModal, setGlobalLoading } = modalSlice.actions
export default modalSlice.reducer
