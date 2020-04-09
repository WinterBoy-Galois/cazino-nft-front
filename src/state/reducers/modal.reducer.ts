import { Reducer } from 'react';
import { Action } from '../actions';
import { ModalState } from '../models/modal.model';

export const modalReducer: Reducer<ModalState, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'SHOW_MODAL':
      return { type: payload.type, data: payload.data };

    case 'HIDE_MODAL':
      return { ...state, type: 'NONE' };

    default:
      return state;
  }
};
