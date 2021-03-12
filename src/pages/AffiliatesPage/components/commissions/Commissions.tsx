import React from 'react';
import styles from '../../AffiliatesPage.module.scss';
import BitcoinValue from '../../../../components/BitcoinValue/BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../../../state';

interface IProps {
  data?: any;
  onTransferBalance?: () => void;
}

const Commissions: React.FC<IProps> = ({ data: data, onTransferBalance = () => null }) => {
  const { t } = useTranslation(['affiliates']);
  const [{ sidebar }] = useStateValue();
  const onTransfer = () => {
    if (data?.refCommissions !== 0) {
      onTransferBalance();
    }
  };
  console.log(data);
  return (
    <div>
      <div className={styles.sub_title}>{t('commissions')}</div>
      <div className={styles.flex_commission}>
        <div className={clsx(sidebar?.isOpen ? styles.btn_width : styles.btn_width_close)}>
          <div className={styles.btn_amount}>
            <div className={styles.flex_amount}>
              <div>{t('amount')}</div>
              <div>
                <BitcoinValue value={formatBitcoin(data?.refCommissions)} />
              </div>
            </div>
          </div>
          <div
            className={clsx(
              data?.refCommissions === 0 ? styles.btn_transfer_disable : styles.btn_transfer
            )}
            onClick={onTransfer}
          >
            <div className={styles.flex_btn}>{t('transfer')}</div>
          </div>
        </div>
        <div className={clsx(sidebar?.isOpen ? styles.bg_width : styles.bg_width_close)} />
      </div>
    </div>
  );
};

export default Commissions;
