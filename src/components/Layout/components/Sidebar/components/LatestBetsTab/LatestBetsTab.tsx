import React from 'react';
import BetTable from '../../../../../BetTable';

const LatestBetsTab: React.SFC = () => {
  return (
    <>
      <BetTable bets={[]} isLoading={false} error={false} />
    </>
  );
};

export default LatestBetsTab;
