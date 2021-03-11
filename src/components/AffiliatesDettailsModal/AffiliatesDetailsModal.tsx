import React from 'react';
import Modal from '../Modal';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from './AffiliatesDetailsModal.module.scss';
import { formatBitcoin } from '../../common/util/format.util';
import Bitcoin from '../icons/social/Bitcoin';

interface IProps {
  show: boolean;
  onClose?: () => void;
  time: string;
  commission: number;
}

const AffiliatesDetailsModal: React.FC<IProps> = ({ show, onClose, time, commission }) => {
  const { t } = useTranslation(['modals']);
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={t('affiliatesDetails.title')}
      modalClassName="circle_warning"
    >
      <div className={clsx(styles.section)}>
        <div className={clsx(styles.section__row)}>
          <div className={clsx(styles.section__label)}>{t('affiliatesDetails.time')}</div>
          <div className={clsx(styles.section__value)}>{time}</div>
        </div>

        <div className={clsx(styles.section__row)}>
          <div className={clsx(styles.section__label)}>{t('affiliatesDetails.commission')}</div>
          <div className={clsx(styles.section__value, styles.section__value__amount)}>
            <Bitcoin />
            {formatBitcoin(commission)}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AffiliatesDetailsModal;
