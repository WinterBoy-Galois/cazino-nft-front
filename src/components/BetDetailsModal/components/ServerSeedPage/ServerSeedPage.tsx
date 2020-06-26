import React from 'react';
import styles from './ServerSeedPage.module.scss';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { BET_DETAILS_SERVER_SEED } from '../../../../graphql/queries';
import { ApolloError } from 'apollo-client';
import Loading from '../../../Loading';
import Error from '../../../Error';
import {
  ServerSeedDetailsOwn,
  ServerSeedDetailsOther,
} from '../../../../models/serverSeedDetails.model';
import OtherServerSeedDetails from './components/OtherServerSeedDetails';
import { CHANGE_SERVER_SEED } from '../../../../graphql/mutations';
import { useStateValue } from '../../../../state';
import { replaceModal } from '../../../Modal';
import OwnServerSeedDetails from './components/OwnServerSeedDetails';

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
  const [, dispatch] = useStateValue();

  const renderDetails = () => {
    if (ownDetails) {
      return <OwnServerSeedDetails ownDetails={ownDetails} />;
    }

    if (ownDetails) {
      const showConfirmationModal = () => {
        replaceModal(dispatch, 'CHANGE_SERVER_SEED_CONFIRMATION', {
          onConfirm: () => {
            if (onChangeServerSeed) {
              onChangeServerSeed();
            }
            replaceModal(dispatch, 'BET_DETAILS_MODAL', { pageIndex: 2 });
          },
          onCancel: () => replaceModal(dispatch, 'BET_DETAILS_MODAL', { pageIndex: 2 }),
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