import { Action } from '../../../state/actions';
import { transitionTimeout } from '../Modal';
import { ModalType } from '../../../state/models/modal.model';

export const closeModal = (dispatch: (value: Action) => void) => {
  dispatch({ type: 'HIDE_MODAL' });
};

export const replaceModal = (dispatch: (value: Action) => void, newModal: ModalType, data: any) => {
  closeModal(dispatch);
  setTimeout(
    () =>
      dispatch({
        type: 'SHOW_MODAL',
        payload: { type: newModal, data },
      }),
    transitionTimeout
  );
};
