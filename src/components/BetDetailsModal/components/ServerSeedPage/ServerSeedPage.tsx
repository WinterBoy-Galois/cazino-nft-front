import React from 'react';
import styles from './ServerSeedPage.module.scss';
import { useQuery } from '@apollo/react-hooks';
import { BET_DETAILS_SERVER_SEED } from '../../../../graphql/queries';
import { ApolloError } from 'apollo-client';
import Loading from '../../../Loading';
import Error from '../../../Error';
import {
  ServerSeedDetailsOwn,
  ServerSeedDetailsOther,
  ServerSeedDetailsLocked,
  ServerSeedDetails,
} from '../../../../models/serverSeedDetails.model';

interface IProps {
  ownDetails?: ServerSeedDetailsOwn;
  lockedDetails?: ServerSeedDetailsLocked;
  otherDetails?: ServerSeedDetailsOther;
  loading: boolean;
  error?: ApolloError;
}

const ServerSeedPage: React.FC<IProps> = ({
  ownDetails,
  lockedDetails,
  otherDetails,
  error,
  loading,
}) => {
  if (loading) {
    return <Loading className={styles.empty} />;
  }

  if (error || (!ownDetails && !lockedDetails && !otherDetails)) {
    return <Error className={styles.empty} />;
  }

  return <div>ServerSeed</div>;
};

export default ServerSeedPage;

interface IWithDataProps {
  betId: string;
}

export const ServerSeedPageWithData: React.SFC<IWithDataProps> = props => {
  const { data, loading, error } = useQuery<{ betDetails: { seedDetails: ServerSeedDetails } }>(
    BET_DETAILS_SERVER_SEED,
    {
      variables: { betId: props.betId },
    }
  );

  const seedDetailsData = data?.betDetails.seedDetails;
  let seedDetails = {};

  if (
    seedDetailsData?.__typename === 'SeedDetailsOwn' &&
    (seedDetailsData as ServerSeedDetailsLocked)?.activeGames
  ) {
    seedDetails = { lockedDetails: data?.betDetails.seedDetails };
  } else if (
    seedDetailsData?.__typename === 'SeedDetailsOwn' &&
    !(seedDetailsData as ServerSeedDetailsLocked)?.activeGames
  ) {
    seedDetails = { ownDetails: data?.betDetails.seedDetails };
  } else if (seedDetailsData?.__typename === 'SeedDetailsOther') {
    seedDetails = { otherDetails: data?.betDetails.seedDetails };
  }

  return <ServerSeedPage {...props} loading={loading} error={error} {...seedDetails} />;
};
