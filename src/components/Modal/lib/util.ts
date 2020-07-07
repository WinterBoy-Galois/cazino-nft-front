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
  closeModal(dispatch);
  setTimeout(
    () =>
      dispatch({
        type: 'MODAL_SHOW',
        payload: { type: newModal, data },
      }),
    transitionTimeout
  );
};
