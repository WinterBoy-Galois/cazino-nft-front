import React from 'react';
import styles from './ServerSeedPage.module.scss';
import { BET_DETAILS_SERVER_SEED } from '../../../../graphql/queries';
import { ApolloError, useQuery, useMutation } from '@apollo/client';
import Loading from '../../../Loading';
import Error from '../../../Error';
import {
  ServerSeedDetailsOwn,
  ServerSeedDetailsOther,
} from '../../../../models/serverSeedDetails.model';
import OtherServerSeedDetails from './components/OtherServerSeedDetails';
import { CHANGE_SERVER_SEED } from '../../../../graphql/mutations';
import OwnServerSeedDetails from './components/OwnServerSeedDetails';
import { useLocation, useNavigate } from '@reach/router';

interface IProps {
  ownDetails?: ServerSeedDetailsOwn;
  otherDetails?: ServerSeedDetailsOther;
  loading: boolean;
  error?: ApolloError;
  onChangeServerSeed?: () => void;
}

const ServerSeedPage: React.FC<IProps> = ({
  ownDetails,
  otherDetails,
  error,
  loading,
  onChangeServerSeed,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderDetails = () => {
    if (ownDetails) {
      const showConfirmationModal = () => {
        navigate(`${location.pathname}?dialog=seed-confirm`, {
          state: {
            onConfirm: () => {
              onChangeServerSeed && onChangeServerSeed();
              navigate(`${location.pathname}?dialog=bet-details`, { state: { pageIndex: 2 } });
            },
            onCancel: () =>
              navigate(`${location.pathname}?dialog=bet-details`, { state: { pageIndex: 2 } }),
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
  betId: string;
}

export const ServerSeedPageWithData: React.SFC<IWithDataProps> = props => {
  const { data, loading, error } = useQuery<{
    betDetails: { seedDetails: ServerSeedDetailsOwn | ServerSeedDetailsOther };
  }>(BET_DETAILS_SERVER_SEED, {
    variables: { betId: props.betId },
  });

  const [changeServerSeed] = useMutation(CHANGE_SERVER_SEED);

  const seedDetailsData = data?.betDetails.seedDetails;
  let seedDetails = {};

  if (seedDetailsData?.__typename === 'SeedDetailsOwn') {
    seedDetails = { ownDetails: data?.betDetails.seedDetails };
  } else if (seedDetailsData?.__typename === 'SeedDetailsOther') {
    seedDetails = { otherDetails: data?.betDetails.seedDetails };
  }

  return (
    <ServerSeedPage
      {...props}
      loading={loading}
      error={error}
      {...seedDetails}
      onChangeServerSeed={changeServerSeed}
    />
  );
};
