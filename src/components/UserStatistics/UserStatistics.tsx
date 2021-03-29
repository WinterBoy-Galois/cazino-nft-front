import React from 'react';
import styles from './UserStatistics.module.scss';
import DetailList from '../DetailList';
import BitcoinValue from '../BitcoinValue';
import { formatBitcoin } from '../../common/util/format.util';
import BitcoinProfit from '../BitcoinProfit';
import GameIconAndText from '../GameIconAndText';
import LostBets from '../LostBets';
import { useTranslation } from 'react-i18next';
import { UserStatistic } from '../../models/userStatistics.model';

interface IProps {
  userStatistic: UserStatistic;
}

const UserStatistics: React.FC<IProps> = ({
  userStatistic: { totalWager, luckyBets, mostPlayed, totalBets, totalProfit },
}) => {
  const { t } = useTranslation();

  return (
    <DetailList
      details={[
        {
          label: t('userStatistics.totalWager'),
          value:
            totalWager !== null ? (
              <BitcoinValue value={formatBitcoin(totalWager)} className={styles.wager_value} />
            ) : (
              <div className={styles.username__hidden}>{t('hidden')}</div>
            ),
        },
        {
          label: t('userStatistics.totalProfit'),
          value:
            totalProfit !== null ? (
              <BitcoinProfit value={totalProfit} className={styles.wager_value} />
            ) : (
              <div className={styles.username__hidden}>{t('hidden')}</div>
            ),
        },
        {
          label: t('userStatistics.mostPlayed'),
          value: <GameIconAndText game={mostPlayed} />,
        },
        {
          label: t('userStatistics.totalBets'),
          value: totalBets,
        },
        {
          label: t('userStatistics.wonBets'),
          value: luckyBets,
        },
        {
          label: t('userStatistics.lostBets'),
          value: <LostBets totalBets={totalBets} luckyBets={luckyBets} />,
        },
      ]}
    />
  );
};

export default UserStatistics;
