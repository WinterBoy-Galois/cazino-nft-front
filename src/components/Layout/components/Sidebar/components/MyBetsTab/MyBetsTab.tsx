import React from 'react';
import MyBetsTable from '../../../../../MyBetsTable';
import Bet from '../../../../../../models/bet';

import styles from './MyBetsTab.module.scss';
import { ViewMode } from '../../../../../MyBetsTable/MyBetsTable';
import { ApolloError } from 'apollo-client';

interface IProps {
  bets?: Bet[];
  isLoading?: boolean;
  error?: ApolloError | undefined;
}

const MyBetsTab: React.SFC<IProps> = ({ bets = [], isLoading = false, error }: IProps) => {
  return (
    <>
      <div className={styles.table}>
        <MyBetsTable
          bets={bets}
          isLoading={isLoading}
          error={error ? true : false}
          // signInUserId="15"
          viewMode={ViewMode.COMPACT}
        />
      </div>
    </>
  );
};

export default MyBetsTab;
