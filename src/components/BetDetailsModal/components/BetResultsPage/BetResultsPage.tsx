import React from 'react';
import BetResultDetails from '../BetResultDetails';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import ProfitLabel from '../../../ProfitLabel';
import BitcoinProfit from '../../../BitcoinProfit';
import BetResultsDice from './components/BetResultsDice';
import styles from './BetResultsPage.module.scss';
import { GameTypes } from '../../../../models/gameTypes.model';
import { useQuery } from '@apollo/react-hooks';
import {
  BetDetails,
  DiceBetResult,
  MinesBetResult,
  GoalsBetResult,
} from '../../../../models/betDetails.model';
import { ApolloError } from 'apollo-client';
import { BET_DETAILS } from '../../../../graphql/queries';
import Error from '../../../Error';
import Loading from '../../../Loading';
import MinesBetResults from './components/MinesBetResults';
import GoalsBetResults from './components/GoalsBetResults';
import { useTranslation } from 'react-i18next';

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
    case GameTypes.CLAMS:
      break;
    case GameTypes.DICE: {
      const { resultFloat, target, winChance, over } = betDetails.gameResult as DiceBetResult;
      results = <BetResultsDice result={resultFloat} rollOver={target} hasWon={!over} />;
      details = [
        {
          label: t('betDetails.bet'),
          value: <BitcoinValue value={formatBitcoin(betDetails.bet)} />,
        },
        { label: t('betDetails.rollOver'), value: target.toFixed(2) },
        { label: t('betDetails.winChance'), value: `${winChance.toFixed(1)}%` },
        {
          label: <ProfitLabel label={t('betDetails.profit')} multiplier={betDetails.multiplier} />,
          value: <BitcoinProfit value={betDetails.profit} />,
        },
      ];
      break;
    }
    case GameTypes.MINES: {
      const { mineCount, minePositions, open } = betDetails.gameResult as MinesBetResult;
      results = (
        <MinesBetResults fieldCount={mineCount} minePositions={minePositions} openedFields={open} />
      );
      details = [
        {
          label: t('betDetails.bet'),
          value: <BitcoinValue value={formatBitcoin(betDetails.bet)} />,
        },
        { label: t('betDetails.mines'), value: `${mineCount}` },
        {
          label: <ProfitLabel label={t('betDetails.profit')} multiplier={betDetails.multiplier} />,
          value: <BitcoinProfit value={betDetails.profit} />,
        },
      ];
      break;
    }
    case GameTypes.GOALS: {
      const { selections, difficulty } = betDetails.gameResult as GoalsBetResult;
      results = <GoalsBetResults selections={selections} />;
      details = [
        {
          label: t('betDetails.bet'),
          value: <BitcoinValue value={formatBitcoin(betDetails.bet)} />,
        },
        {
          label: t('betDetails.difficulty.label'),
          value: t(`betDetails.difficulty.${difficulty}`),
        },
        {
          label: <ProfitLabel label={t('betDetails.profit')} multiplier={betDetails.multiplier} />,
          value: <BitcoinProfit value={betDetails.profit} />,
        },
      ];
      break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.bet__results}>{results}</div>
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

export const BetResultsPageWithData: React.SFC<IWithDataProps> = props => {
  const { data, loading, error } = useQuery<{ betDetails: BetDetails }>(BET_DETAILS, {
    variables: { betId: props.betId },
  });

  return (
    <BetResultsPage {...props} loading={loading} error={error} betDetails={data?.betDetails} />
  );
};
