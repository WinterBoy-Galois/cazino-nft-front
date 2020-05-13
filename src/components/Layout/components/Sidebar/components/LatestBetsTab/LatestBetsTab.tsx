import React, { useEffect, useState } from 'react';
import BetTable from '../../../../../BetTable';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { LATEST_BETS } from '../../../../../../graphql/queries';
import { BET_ADDED } from '../../../../../../graphql/subscriptions';
import { useBetBuffer, DispatchSpeed } from '../../../../../BetTable/lib/useBetBuffer.hook';
import Bet from '../../../../../../models/bet';

const LatestBetsTab: React.SFC = () => {
  const [bets, setBets] = useState<Bet[]>([]);

  const handleBetAdded = (betAdded: Bet) => {
    const newBets = [betAdded, ...bets.slice(0, 9)];
    setBets(newBets);
  };

  const { addBets } = useBetBuffer({
    bufferSize: 100,
    dispatchSpeed: DispatchSpeed.AUTO,
    onBetDispatched: handleBetAdded,
    currentUserId: 15,
  });

  useSubscription(BET_ADDED, {
    onSubscriptionData: data => {
      const betAdded = data?.subscriptionData?.data?.betAdded;
      if (betAdded) {
        // console.log('onSubscriptionData?', data.subscriptionData.data.betAdded);
        addBets([betAdded]);
      }
    },
  });

  const { loading, error } = useQuery(LATEST_BETS, {
    onCompleted: data => {
      setBets(data.bets);
    },
  });

  // const { loading, error, subscribeToMore } = useQuery(LATEST_BETS, {
  //   onCompleted: data => {
  //     setBets(data.bets);
  //   },
  // });

  // useEffect(() => {
  //   return subscribeToMore({
  //     document: BET_ADDED,
  //     updateQuery: (prev: any, { subscriptionData }: any) => {
  //       if (subscriptionData.data) {
  //         addBets([subscriptionData.data.betAdded]);
  //         console.log('subscriptionData.data?', {
  //           username: subscriptionData.data.betAdded.username,
  //           data: subscriptionData.data.betAdded,
  //         });
  //       }
  //     },
  //   });
  // }, [subscribeToMore, addBets]);

  return (
    <>
      <BetTable bets={bets} isLoading={loading} error={error ? true : false} />
    </>
  );
};

export default LatestBetsTab;
