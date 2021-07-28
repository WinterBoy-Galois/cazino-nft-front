import React from 'react';
import styles from './ProfitCutModal.module.scss';
import Modal from '../Modal';
import { useNavigate, useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Button from '../../components/Button';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';

interface IProps {
  show: boolean;
  onClose?: () => void;
  maxProfit?: number;
  profitCut?: string;
  errorMessage?: any;
}

const ProfitCutModal: React.FC<IProps> = ({
  show,
  onClose,
  maxProfit = 0,
  profitCut,
  errorMessage = null,
}) => {
  const { t } = useTranslation(['modals']);

  const renderModalContent = () => {
    if (errorMessage) return <p>{errorMessage}</p>;

    return t(profitCut === 'WARNING' ? 'profitCut.warningMessage' : 'profitCut.cutMessage')
      .split('\n')
      .map((message, index) => (
        <p key={`message-${index}`}>
          {message.replace('MAX_PROFIT', maxProfit?.toFixed(1).toString())}
        </p>
      ));
  };

  return (
    <Modal show={show} onClose={onClose} title={t('profitCut.title')} modalClassName="warning">
      <div className={clsx(styles.modal__row, 'row')}>
        <div className={clsx(styles.modal__content)}>{renderModalContent()}</div>

        <div className={clsx(styles.modal__footer)}>
          <Button className={styles.modal__footer__button} onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfitCutModal;

export const ProfitCutModalWithData: React.FC<IProps> = props => {
  const isAuthorized = useIsAuthorized();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (props.show && !isAuthorized) {
    navigate(pathname);
    return null;
  }

  return <ProfitCutModal {...props} />;
};
