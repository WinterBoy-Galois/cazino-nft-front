import React from 'react';
import Modal from '../Modal';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from './WithdrawalDetailsModal.module.scss';
import { formatBitcoin } from '../../common/util/format.util';
import Bitcoin from '../icons/social/Bitcoin';
import CopyField from '../CopyField';

interface IProps {
  show: boolean;
  onClose?: () => void;
  address: string;
  amount: number;
  status: string;
  time: string;
}

const WithdrawalDetailsModal: React.FC<IProps> = ({
  show,
  onClose,
  address,
  amount,
  status,
  time,
}) => {
  const { t } = useTranslation(['modals']);

  const getStatusClassName = (status: string) => {
    if (status === 'WITHDRAW_PENDING') return styles.withdrawal__status__yellow;

    if (status === 'WITHDRAW_CONFIRMED') return styles.withdrawal__status__green;

    if (status === 'WITHDRAW_REJECTED') return styles.withdrawal__status__red;

    return styles.withdrawal__status__unknown;
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={t('withdrawalDetails.title')}
      modalClassName="circle_warning"
    >
      <div className={clsx(styles.section)}>
        <div className={clsx(styles.section__first)}>
          <div className={clsx(styles.section__row)}>
            <div className={clsx(styles.section__label)}>{t('withdrawalDetails.time')}</div>
            <div className={clsx(styles.section__value)}>{time}</div>
          </div>

          <div className={clsx(styles.section__row)}>
            <div className={clsx(styles.section__label)}>{t('withdrawalDetails.amount')}</div>
            <div className={clsx(styles.section__value, styles.section__value__amount)}>
              <Bitcoin />
              {formatBitcoin(amount)}
            </div>
          </div>

          <div className={clsx(styles.section__row)}>
            <div className={clsx(styles.section__label)}>{t('withdrawalDetails.status')}</div>
            <div className={styles.section__value}>
              <span className={clsx(styles.withdrawal__status, getStatusClassName(status))}>
                &nbsp;
              </span>
              {status?.replace('WITHDRAW_', '')}
            </div>
          </div>
        </div>

        <CopyField
          label={t('withdrawalDetails.address')}
          value={address}
          className={styles.section__second}
        />
      </div>
    </Modal>
  );
};

export default WithdrawalDetailsModal;
