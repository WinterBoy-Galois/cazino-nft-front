import React, { useState } from 'react';
import LatestBetsTable from '../../../../../LatestBetsTable';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { LATEST_BETS } from '../../../../../../graphql/queries';
import { BET_ADDED } from '../../../../../../graphql/subscriptions';
import { useBetBuffer, DispatchSpeed } from '../../../../../LatestBetsTable/lib/useBetBuffer.hook';
import Bet, { GameTypes } from '../../../../../../models/bet';

import styles from './MyBetsTab.module.scss';
import { ViewMode } from '../../../../../LatestBetsTable/LatestBetsTable';

const MyBetsTab: React.SFC = () => {
  const [bets, setBets] = useState<Bet[]>([]);

  const handleAddedForCurrentUser = (betAdded: Bet) => {
    const newBets = [betAdded, ...bets.slice(0, 9)];
    setBets(newBets);
  };

  const { addBets } = useBetBuffer({
    bufferSize: 100,
    dispatchSpeed: DispatchSpeed.AUTO,
    currentUserId: 15,
    onBetAddedForCurrentUser: handleAddedForCurrentUser,
  });

  useSubscription(BET_ADDED, {
    onSubscriptionData: data => {
      const betAdded: Bet = data?.subscriptionData?.data?.betAdded;
      if (betAdded) {
        // DICE
        const games: { [key: string]: GameTypes } = {
          DICE: GameTypes.DICE,
          GOALS: GameTypes.GOALS,
          MINES: GameTypes.MINES,
          CLAMS: GameTypes.CLAMS,
        };
        const game: GameTypes = games[betAdded.gameid];
        // console.log('onSubscriptionData?', data.subscriptionData.data.betAdded);
        addBets([{ ...betAdded, gameid: game }]);
      }
    },
  });

  const { loading, error } = useQuery(LATEST_BETS, {
    onCompleted: data => {
      // setBets(data.bets);
    },
  });

  return (
    <>
      <div className={styles.table}>
        <LatestBetsTable
          bets={bets}
          isLoading={loading}
          error={error ? true : false}
          // signInUserId="15"
          viewMode={ViewMode.COMPACT}
        />
      </div>
    </>
  );
};

export default MyBetsTab;
