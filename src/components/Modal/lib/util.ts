import { Action } from '../../../state/actions';
import { transitionTimeout } from '../Modal';
import { ModalType } from '../../../state/models/modal.model';

export const closeModal = (dispatch: (value: Action) => void) => {
  dispatch({ type: 'MODAL_HIDE' });
};

export const replaceModal = (
  dispatch: (value: Action) => void,
  newModal: ModalType,
  data?: any
) => {
  dispatch({ type: 'MODAL_HIDE', payload: { isReplace: true } });

  setTimeout(
    () =>
      dispatch({
        type: 'MODAL_SHOW',
        payload: { type: newModal, data },
      }),
    transitionTimeout
  );
};

export const showModal = (dispatch: (value: Action) => void, modal: ModalType, data?: any) => {
  dispatch({
    type: 'MODAL_SHOW',
    payload: { type: modal, data },
  });
};
