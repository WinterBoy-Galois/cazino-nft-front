import React from 'react';
import BetResultDetails from '../BetResultDetails';
import BitcoinValue from '../../../BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import ProfitLabel from '../../../ProfitLabel';
import BitcoinProfit from '../../../BitcoinProfit';
import BetResultsDice from './components/DiceBetResults';
import styles from './BetResultsPage.module.scss';
import { GameTypes } from '../../../../models/gameTypes.model';
import { useQuery } from '@apollo/react-hooks';
import { BetDetails, DiceBetResult } from '../../../../models/betDetails.model';
import { ApolloError } from 'apollo-client';
import { BET_DETAILS } from '../../../../graphql/queries';
import Error from '../../../Error';
import Loading from '../../../Loading';

interface IProps {
  gameType: GameTypes;
  betDetails?: BetDetails;
  loading: boolean;
  error?: ApolloError;
}

const BetResultsPage: React.FC<IProps> = ({ gameType, betDetails, loading, error }) => {
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
        { label: 'bet', value: <BitcoinValue value={formatBitcoin(betDetails.bet)} /> },
        { label: 'roll over', value: target.toFixed(2) },
        { label: 'win chance', value: `${winChance.toFixed(1)}%` },
        {
          label: <ProfitLabel label="Profit" multiplier={betDetails.multiplier} />,
          value: <BitcoinProfit value={betDetails.profit} />,
        },
      ];
      break;
    }
    case GameTypes.MINES:
      break;
    case GameTypes.GOALS:
      break;
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
