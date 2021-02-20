import React from 'react';
import Modal from '../Modal';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from './BonusDetailsModal.module.scss';
import { formatBitcoin } from '../../common/util/format.util';
import Bitcoin from '../icons/social/Bitcoin';

interface IProps {
  show: boolean;
  onClose?: () => void;
  givenAt: string;
  type: string;
  wager: number;
  amount: number;
}

const BonusDetailsModal: React.FC<IProps> = ({ show, onClose, givenAt, type, wager, amount }) => {
  const { t } = useTranslation(['modals']);

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={t('bonusDetails.title')}
      modalClassName="circle_warning"
    >
      <div className={clsx(styles.section)}>
        <div className={clsx(styles.section__row)}>
          <div className={clsx(styles.section__label)}>{t('bonusDetails.time')}</div>
          <div className={clsx(styles.section__value)}>{givenAt}</div>
        </div>

        <div className={clsx(styles.section__row)}>
          <div className={clsx(styles.section__label)}>{t('bonusDetails.type')}</div>
          <div className={clsx(styles.section__value)}>{type}</div>
        </div>

        <div className={clsx(styles.section__row)}>
          <div className={clsx(styles.section__label)}>{t('bonusDetails.wager')}</div>
          <div className={clsx(styles.section__value, styles.section__value__amount)}>
            <Bitcoin />
            {formatBitcoin(wager)}
          </div>
        </div>

        <div className={clsx(styles.section__row)}>
          <div className={clsx(styles.section__label)}>{t('bonusDetails.amount')}</div>
          <div
            className={clsx(
              styles.section__value,
              styles.section__value__amount,
              styles.section__value__bonus
            )}
          >
            <Bitcoin />+{formatBitcoin(amount)}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BonusDetailsModal;
