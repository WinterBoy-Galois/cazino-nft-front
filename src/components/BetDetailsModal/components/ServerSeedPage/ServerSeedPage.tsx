import React from 'react';
import styles from './ServerSeedPage.module.scss';
import { BET_DETAILS_SERVER_SEED } from '../../../../graphql/queries';
import { ApolloError, useQuery } from '@apollo/client';
import Loading from '../../../Loading';
import Error from '../../../Error';
import {
  ServerSeedDetailsOwn,
  ServerSeedDetailsOther,
} from '../../../../models/serverSeedDetails.model';
import OtherServerSeedDetails from './components/OtherServerSeedDetails';
import OwnServerSeedDetails from './components/OwnServerSeedDetails';
import { useLocation, useNavigate } from '@reach/router';
import Bet from '../../../../models/bet.model';

interface IProps {
  bet: Bet;
  ownDetails?: ServerSeedDetailsOwn;
  otherDetails?: ServerSeedDetailsOther;
  loading: boolean;
  error?: ApolloError;
}

const ServerSeedPage: React.FC<IProps> = ({ ownDetails, otherDetails, error, loading, bet }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const renderDetails = () => {
    if (ownDetails) {
      const showConfirmationModal = () => {
        navigate(`${pathname}?dialog=seed-confirm`, {
          state: {
            confirmPath: `${pathname}?dialog=bet-details`,
            confirmState: { activePage: 2, confirmed: true, bet },
            cancelPath: `${pathname}?dialog=bet-details`,
            cancelState: { activePage: 2, cancelled: true, bet },
          },
        });
      };

      return (
        <OwnServerSeedDetails ownDetails={ownDetails} onChangeServerSeed={showConfirmationModal} />
      );
    }

    if (otherDetails) {
      return <OtherServerSeedDetails otherDetails={otherDetails} />;
    }

    return null;
  };

  if (loading) {
    return <Loading className={styles.empty} />;
  }

  if (error || (!ownDetails && !otherDetails)) {
    return <Error className={styles.empty} />;
  }

  return <div className={styles.container}>{renderDetails()}</div>;
};

export default ServerSeedPage;

interface IWithDataProps {
  bet: Bet;
}

export const ServerSeedPageWithData: React.FC<IWithDataProps> = props => {
  const { data, loading, error } = useQuery<{
    betDetails: { seedDetails: ServerSeedDetailsOwn | ServerSeedDetailsOther };
  }>(BET_DETAILS_SERVER_SEED, {
    variables: { betId: props.bet.id },
    fetchPolicy: 'network-only',
  });
  const seedDetailsData = data?.betDetails.seedDetails;
  let seedDetails = {};

  if (seedDetailsData?.__typename === 'SeedDetailsOwn') {
    seedDetails = { ownDetails: data?.betDetails.seedDetails };
  } else if (seedDetailsData?.__typename === 'SeedDetailsOther') {
    seedDetails = { otherDetails: data?.betDetails.seedDetails };
  }

  return <ServerSeedPage {...props} loading={loading} error={error} {...seedDetails} />;
};
