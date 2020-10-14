import React from 'react';
import MyBetsTable from '../../../../../MyBetsTable';
import Bet from '../../../../../../models/bet.model';

import styles from './MyBetsTab.module.scss';
import { ViewMode } from '../../../../../MyBetsTable/MyBetsTable';
import { ApolloError } from '@apollo/client';

interface IProps {
  bets?: Bet[];
  isLoading?: boolean;
  error?: ApolloError | undefined;
  isSignedIn?: boolean;
}

const MyBetsTab: React.FC<IProps> = ({
  bets = [],
  isLoading = false,
  error,
  isSignedIn,
}: IProps) => {
  return (
    <div className={styles.table}>
      <MyBetsTable
        bets={bets}
        isLoading={isLoading}
        error={error ? true : false}
        viewMode={ViewMode.COMPACT}
        isSignedIn={isSignedIn}
      />
    </div>
  );
};

export default MyBetsTab;
