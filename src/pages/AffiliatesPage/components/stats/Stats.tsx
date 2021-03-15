import React from 'react';
import styles from '../../AffiliatesPage.module.scss';
import BitcoinValue from '../../../../components/BitcoinValue/BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import { useTranslation } from 'react-i18next';

interface IProps {
  data: any;
}

const Stats: React.FC<IProps> = ({ data: data }) => {
  const { t } = useTranslation(['affiliates']);

  return (
    <div>
      <div className={styles.sub_title}>{t('stats')}</div>
      <div className={styles.contents}>
        <div className={styles.flex_between}>
          <div className={styles.txt_color}>{t('total_wager')}</div>
          <div>
            <BitcoinValue value={formatBitcoin(data?.wager)} />
          </div>
        </div>
        <div className={styles.flex_between}>
          <div className={styles.txt_color}>{t('total_commissions')}</div>
          <div>
            <BitcoinValue value={formatBitcoin(data?.commissions)} />
          </div>
        </div>
        <div className={styles.flex_between}>
          <div className={styles.txt_color}>{t('referrals')}</div>
          <div>{data?.refs}</div>
        </div>
        <div className={styles.flex_between}>
          <div className={styles.txt_color}>{t('total_bets')}</div>
          <div>{data?.bets}</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
