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
  ServerSeedDetailsLocked,
  ServerSeedDetails,
} from '../../../../models/serverSeedDetails.model';
import OwnServerSeedDetails from './components/OwnServerSeedDetails';
import LockedServerSeedDetails from './components/LockedServerSeedDetails';
import OtherServerSeedDetails from './components/OtherServerSeedDetails';
import { CHANGE_SERVER_SEED } from '../../../../graphql/mutations';
import { useStateValue } from '../../../../state';
import { transitionTimeout } from '../../../Modal';

interface IProps {
  ownDetails?: ServerSeedDetailsOwn;
  lockedDetails?: ServerSeedDetailsLocked;
  otherDetails?: ServerSeedDetailsOther;
  loading: boolean;
  error?: ApolloError;
  onChangeServerSeed?: () => void;
}

const ServerSeedPage: React.FC<IProps> = ({
  ownDetails,
  lockedDetails,
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

    if (lockedDetails) {
      const showConfirmationModal = () => {
        dispatch({ type: 'HIDE_MODAL' });
        // Wait for modal close animation
        setTimeout(
          () =>
            dispatch({
              type: 'SHOW_MODAL',
              payload: {
                type: 'CHANGE_SERVER_SEED_CONFIRMATION',
                data: {
                  onConfirm: () => {
                    if (onChangeServerSeed) {
                      onChangeServerSeed();
                    }

                    dispatch({ type: 'HIDE_MODAL' });
                    setTimeout(
                      () =>
                        dispatch({
                          type: 'SHOW_MODAL',
                          payload: { type: 'BET_DETAILS_MODAL', data: { pageIndex: 2 } },
                        }),
                      transitionTimeout
                    );
                  },
                  onCancel: () => {
                    dispatch({ type: 'HIDE_MODAL' });
                    setTimeout(
                      () =>
                        dispatch({
                          type: 'SHOW_MODAL',
                          payload: { type: 'BET_DETAILS_MODAL', data: { pageIndex: 2 } },
                        }),
                      transitionTimeout
                    );
                  },
                },
              },
            }),
          transitionTimeout
        );
      };

      return (
        <LockedServerSeedDetails
          lockedDetails={lockedDetails}
          onChangeServerSeed={showConfirmationModal}
        />
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

  if (error || (!ownDetails && !lockedDetails && !otherDetails)) {
    return <Error className={styles.empty} />;
  }

  return <div className={styles.container}>{renderDetails()}</div>;
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

  const [changeServerSeed] = useMutation(CHANGE_SERVER_SEED);

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
