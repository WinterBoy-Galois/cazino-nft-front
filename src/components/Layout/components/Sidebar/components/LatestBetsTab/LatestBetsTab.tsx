import React, { useCallback } from 'react';
import LatestBetsTable from '../../../../../LatestBetsTable';
import styles from './LatestBetsTab.module.scss';
import { ViewMode } from '../../../../../LatestBetsTable/LatestBetsTable';
import Bet from '../../../../../../models/bet.model';
import { ApolloError } from 'apollo-client';
import { navigate, useLocation } from '@reach/router';
import { useStateValue } from '../../../../../../state';
import { appConfig } from '../../../../../../common/config';

interface IProps {
  bets?: Bet[];
  isLoading?: boolean;
  error?: ApolloError | undefined;
}

const LatestBetsTab: React.SFC<IProps> = ({ bets = [], isLoading = false, error }: IProps) => {
  const [
    {
      auth: { user },
    },
  ] = useStateValue();
  const location = useLocation();
  const handleUsernameClick = useCallback(
    userId => navigate(`${location.pathname}?dialog=user-info`, { state: { userId } }),
    [location.pathname]
  );

  return (
    <>
      <div className={styles.table}>
        <LatestBetsTable
          bets={bets}
          isLoading={isLoading}
          error={error ? true : false}
          signInUserId={user?.id}
          viewMode={ViewMode.RESPONSIVE}
          reduceMotion={appConfig.reduceMotion}
          onUsernameClicked={handleUsernameClick}
        />
      </div>
    </>
  );
};

export default LatestBetsTab;
