import React from 'react';
import LatestBetsTable from '../../../../../LatestBetsTable';

import styles from './LatestBetsTab.module.scss';
import { ViewMode } from '../../../../../LatestBetsTable/LatestBetsTable';
import Bet from '../../../../../../models/bet.model';
import { ApolloError } from 'apollo-client';
import { useStateValue } from '../../../../../../state';

interface IProps {
  bets?: Bet[];
  isLoading?: boolean;
  error?: ApolloError | undefined;
}

const LatestBetsTab: React.SFC<IProps> = ({ bets = [], isLoading = false, error }: IProps) => {
  const [, dispatch] = useStateValue();

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
          onUsernameClicked={userId =>
            dispatch({
              type: 'MODAL_SHOW',
              payload: { type: 'USER_INFO_MODAL', data: { userId } },
            })
          }
        />
      </div>
    </>
  );
};

export default LatestBetsTab;
