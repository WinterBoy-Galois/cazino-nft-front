import React from 'react';
import styles from '../../AffiliatesPage.module.scss';
import BitcoinValue from '../../../../components/BitcoinValue/BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
// import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface IProps {
  data?: any;
  onTransferBalance?: () => void;
}

const Commissions: React.FC<IProps> = ({ data: data, onTransferBalance = () => null }) => {
  const { t } = useTranslation(['affiliates']);
  const onTransfer = () => {
    onTransferBalance();
  };
  console.log(data);
  return (
    <div>
      <div className={styles.sub_title}>{t('commissions')}</div>
      <div className={styles.flex_commission}>
        <div className={styles.btn_width}>
          <div className={styles.btn_amount}>
            <div className={styles.flex_amount}>
              <div>{t('amount')}</div>
              <div>
                <BitcoinValue value={formatBitcoin(data?.refCommissions)} />
              </div>
            </div>
          </div>
          <div className={styles.btn_transfer} onClick={onTransfer}>
            <div className={styles.flex_btn}>{t('transfer')}</div>
          </div>
        </div>
        <div className={styles.bg_width}>
          <div className={styles.commission_bg} />
        </div>
      </div>
    </div>
  );
};

export default Commissions;
