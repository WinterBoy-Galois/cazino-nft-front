import { Reducer } from 'react';
import { Action } from '../actions';
import { ModalState } from '../models/modal.model';

export const modalReducer: Reducer<ModalState, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'MODAL_SHOW':
      return { type: payload.type, data: payload.data };

    case 'MODAL_HIDE':
      return { ...state, type: 'NONE' };

    default:
      return state;
  }
};
