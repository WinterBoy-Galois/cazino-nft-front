import React from 'react';
import LatestBetsTable from '../../../../../LatestBetsTable';

import styles from './LatestBetsTab.module.scss';
import { ViewMode } from '../../../../../LatestBetsTable/LatestBetsTable';
import Bet from '../../../../../../models/bet.model';
import { ApolloError } from 'apollo-client';

interface IProps {
  bets?: Bet[];
  isLoading?: boolean;
  error?: ApolloError | undefined;
}

const LatestBetsTab: React.SFC<IProps> = ({ bets = [], isLoading = false, error }: IProps) => {
  return (
    <>
      <div className={styles.table}>
        <LatestBetsTable
          bets={bets}
          isLoading={isLoading}
          error={error ? true : false}
          signInUserId="15"
          viewMode={ViewMode.RESPONSIVE}
          reduceMotion={true}
        />
      </div>
    </>
  );
};

export default LatestBetsTab;
