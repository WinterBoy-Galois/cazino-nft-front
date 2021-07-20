import React, { useEffect, useState } from 'react';
import styles from './FaucetModal.module.scss';
import Modal from '../Modal';
import { useNavigate, useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Button from '../../components/Button';
import FaucetModalIcon from '../../components/icons/Faucet/FaucetModal';
import BitcoinValue from '../../components/BitcoinValue';
import { error as errorToast, success } from '../../components/Toast';
import { formatBitcoin } from '../../common/util/format.util';
import { CLAIM_FAUCET } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';
import { updateUserAction } from '../../user/user.actions';
import { useUserState } from '../../user/UserProvider';

interface IProps {
  show: boolean;
  onClose?: () => void;
  amount?: number;
  canClaim?: boolean;
  every?: number;
  timestamp?: any;
  errMessage?: any;
}

const secondsToHms = (d: number) => {
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + (h == 1 ? ' hr, ' : ' hrs, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' min, ' : ' mins, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' sec' : ' secs') : '';

  return hDisplay + mDisplay + sDisplay;
};

const FaucetModal: React.FC<IProps> = ({
  show,
  onClose = () => null,
  amount = 0,
  canClaim,
  every = 0,
  timestamp,
  errMessage: defaultErrMessage = '',
}) => {
  const { t } = useTranslation(['modals', 'games']);
  const [, dispatch] = useUserState();
  const [claimFaucet] = useMutation(CLAIM_FAUCET);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => setErrMessage(defaultErrMessage), [timestamp, defaultErrMessage]);

  const onClaim = async () => {
    const { data, errors } = await claimFaucet();

    if (errors || data.claimFaucet?.errors) {
      const errorArr = errors ?? data.claimFaucet?.errors;

      if (errorArr[0].code === 'FAUCET_CLAIM_DISABLED') {
        return setErrMessage(errorArr[0].message);
      } else {
        return errorToast(errorArr[0].message);
      }
    }

    if (data.claimFaucet.balance) {
      dispatch(updateUserAction({ balance: data.claimFaucet.balance }));
      success(
        `${t('games:your_ballance_has_been_updated')}: ${formatBitcoin(+data.claimFaucet.balance)}`
      );
      onClose();
    }
  };

  const renderModalContent = () => {
    if (errMessage) return <p>{errMessage}</p>;

    return (
      <>
        <div className={clsx(styles.modal__content__left)}>
          <FaucetModalIcon className={clsx(styles.modal__content__icon)} />
        </div>

        <div className={clsx(styles.modal__content__right)}>
          <div className={clsx(styles.modal__content__right__info)}>
            <div className={clsx(styles.modal__content__right__info__row)}>
              <span>{t('modals:faucet.amount')}</span>

              <BitcoinValue
                className={clsx(styles.modal__content__right__info__balance)}
                value={formatBitcoin(amount)}
              />
            </div>

            <div className={clsx(styles.modal__content__right__info__row)}>
              <span>{t('modals:faucet.every')}</span>
              <span>{secondsToHms(every)}</span>
            </div>
          </div>

          <div>
            <Button
              disabled={!canClaim}
              className={styles.modal__content__right__button}
              onClick={onClaim}
            >
              {t('modals:faucet.buttonText')}
            </Button>

            <p className={styles.modal__content__right__description}>
              {t('modals:faucet.description')}
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <Modal show={show} onClose={onClose} title={t('modals:faucet.title')}>
      <div className={clsx(styles.modal__row, 'row')}>
        <div className={clsx(styles.modal__content)}>{renderModalContent()}</div>
      </div>
    </Modal>
  );
};

export default FaucetModal;

export const FaucetModalWithData: React.FC<IProps> = props => {
  const isAuthorized = useIsAuthorized();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (props.show && !isAuthorized) {
    navigate(pathname);
    return null;
  }

  return <FaucetModal {...props} />;
};
