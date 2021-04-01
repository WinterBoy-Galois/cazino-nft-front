import React from 'react';
import BetResultDetails from '../BetResultDetails';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin, formatWinChance } from '../../../../common/util/format.util';
import ProfitLabel from '../../../ProfitLabel';
import BitcoinProfit from '../../../BitcoinProfit';
import BetResultsDice from './components/DiceBetResults';
import styles from './BetResultsPage.module.scss';
import { GameTypes } from '../../../../models/gameTypes.model';
import {
  BetDetails,
  DiceBetResult,
  MinesBetResult,
  GoalsBetResult,
  ClamsBetResult,
} from '../../../../models/betDetails.model';
import { ApolloError, useQuery } from '@apollo/client';
import { BET_DETAILS } from '../../../../graphql/queries';
import Error from '../../../Error';
import Loading from '../../../Loading';
import MinesBetResults from './components/MinesBetResults';
import GoalsBetResults from './components/GoalsBetResults';
import { useTranslation } from 'react-i18next';
import ClamsBetResults from './components/ClamsBetResults';

interface IProps {
  gameType: GameTypes;
  betDetails?: BetDetails;
  loading: boolean;
  error?: ApolloError;
}

const BetResultsPage: React.FC<IProps> = ({ gameType, betDetails, loading, error }) => {
  const { t } = useTranslation(['modals']);

  if (loading) {
    return <Loading className={styles.empty} />;
  }

  if (error) {
    return <Error className={styles.empty} />;
  }

  if (!betDetails) {
    return null;
  }

  let results;
  let details;

  switch (gameType) {
    case GameTypes.CLAMS: {
      const { resultInteger, selection } = betDetails.gameResult as ClamsBetResult;
      results = <ClamsBetResults result={resultInteger} selection={selection} />;
      details = [
        {
          label: t('betDetails.bet'),
          value: <BitcoinValue value={formatBitcoin(betDetails.bet)} className={styles.value} />,
        },
        { label: t('betDetails.clams'), value: selection?.length ?? 'n/a' },
        {
          label: <ProfitLabel label={t('betDetails.profit')} multiplier={betDetails.multiplier} />,
          value: <BitcoinProfit value={betDetails.profit} className={styles.value} />,
        },
      ];
      break;
    }
    case GameTypes.DICE: {
      const { resultFloat, target, winChance, over } = betDetails.gameResult as DiceBetResult;
      results = <BetResultsDice result={resultFloat} target={target} over={over} />;
      details = [
        {
          label: t('betDetails.bet'),
          value: <BitcoinValue value={formatBitcoin(betDetails.bet)} className={styles.value} />,
        },
        {
          label: over ? t('betDetails.rollOver') : t('betDetails.rollUnder'),
          value: target?.toFixed(2) ?? 'n/a',
        },
        { label: t('betDetails.winChance'), value: formatWinChance(winChance) },
        {
          label: <ProfitLabel label={t('betDetails.profit')} multiplier={betDetails.multiplier} />,
          value: <BitcoinProfit value={betDetails.profit} className={styles.value} />,
        },
      ];
      break;
    }
    case GameTypes.MINES: {
      const { minePositions, open } = betDetails.gameResult as MinesBetResult;
      results = <MinesBetResults minePositions={minePositions} openedFields={open} />;
      details = [
        {
          label: t('betDetails.bet'),
          value: <BitcoinValue value={formatBitcoin(betDetails.bet)} className={styles.value} />,
        },
        { label: t('betDetails.mines'), value: `${minePositions?.length ?? 'n/a'}` },
        {
          label: <ProfitLabel label={t('betDetails.profit')} multiplier={betDetails.multiplier} />,
          value: <BitcoinProfit value={betDetails.profit} className={styles.value} />,
        },
      ];
      break;
    }
    case GameTypes.GOALS: {
      const { selections, difficulty } = betDetails.gameResult as GoalsBetResult;
      results = <GoalsBetResults selections={selections} difficulty={difficulty} />;
      details = [
        {
          label: t('betDetails.bet'),
          value: <BitcoinValue value={formatBitcoin(betDetails.bet)} className={styles.value} />,
        },
        {
          label: t('betDetails.difficulty.label'),
          value: t(`betDetails.difficulty.${difficulty}`),
        },
        {
          label: <ProfitLabel label={t('betDetails.profit')} multiplier={betDetails.multiplier} />,
          value: <BitcoinProfit value={betDetails.profit} className={styles.value} />,
        },
      ];
      break;
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.bet__results} ${styles[`bet__results--${gameType.toLowerCase()}`]}`}
      >
        {results}
      </div>
      <div className={styles.bet__details}>
        <BetResultDetails details={details} />
      </div>
    </div>
  );
};

export default BetResultsPage;

interface IWithDataProps {
  gameType: GameTypes;
  betId: string;
}

export const BetResultsPageWithData: React.FC<IWithDataProps> = props => {
  const { data, loading, error } = useQuery<{ betDetails: BetDetails }>(BET_DETAILS, {
    variables: { betId: props.betId },
  });

  return (
    <BetResultsPage {...props} loading={loading} error={error} betDetails={data?.betDetails} />
  );
};
