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

const UserStatistics: React.SFC<IProps> = ({
  userStatistic: { totalWager, luckyBets, mostPlayed, totalBets, totalProfit },
}) => {
  const { t } = useTranslation();

  return (
    <DetailList
      details={[
        {
          label: 'Total Wager',
          value:
            totalWager !== null ? (
              <BitcoinValue value={formatBitcoin(totalWager)} className={styles.value} />
            ) : (
              <div className={styles.username__hidden}>{t('hidden')}</div>
            ),
        },
        {
          label: 'Total Profit',
          value:
            totalProfit !== null ? (
              <BitcoinProfit value={totalProfit} className={styles.value} />
            ) : (
              <div className={styles.username__hidden}>{t('hidden')}</div>
            ),
        },
        {
          label: 'Most Played',
          value: <GameIconAndText game={mostPlayed} />,
        },
        {
          label: 'Total Bets',
          value: totalBets,
        },
        {
          label: 'Won Bets',
          value: luckyBets,
        },
        {
          label: 'Lost Bets',
          value: <LostBets totalBets={totalBets} luckyBets={luckyBets} />,
        },
      ]}
    />
  );
};

export default UserStatistics;
