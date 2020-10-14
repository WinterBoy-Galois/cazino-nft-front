import React, { useCallback } from 'react';
import Modal from '../Modal';
import styles from './UserInfoModal.module.scss';
import { USER_INFO } from '../../graphql/queries';
import Username from '../Username';
import Button from '../Button';
import Loading from '../Loading';
import Error from '../Error';
import { ApolloError, useQuery } from '@apollo/client';
import DetailsContainer from '../DetailsContainer';
import { useLocation, useNavigate } from '@reach/router';
import UserStatistics from '../UserStatistics';

interface IProps {
  show: boolean;
  data: any;
  loading: boolean;
  error?: ApolloError;
  onClose?: () => void;
  onBack?: () => void;
}

const UserInfoModal: React.FC<IProps> = ({
  show,
  onClose,
  data,
  loading,
  error,
  onBack,
}: IProps) => {
  return (
    <Modal show={show} onClose={onClose} title="User Info">
      {loading ? <Loading /> : null}

      {error || data?.userInfo?.errors ? <Error>Could not load user info.</Error> : null}

      {data?.userInfo && !data?.userInfo?.errors && !loading ? (
        <div>
          <Username
            className={`${styles.username} ${styles['username--mobile']}`}
            username={data.userInfo.username}
            avatarUrl={data.userInfo.avatarUrl}
            loading={loading}
          />
          <DetailsContainer className={styles.details}>
            <Username
              className={`${styles.username} ${styles['username--desktop']}`}
              username={data.userInfo.username}
              avatarUrl={data.userInfo.avatarUrl}
              loading={loading}
            />

            <UserStatistics userStatistic={{ ...data.userInfo }} />
          </DetailsContainer>

          <div className={styles.button}>
            {onBack ? (
              <Button onClick={onBack}>Back</Button>
            ) : (
              <div className={styles.button__spacer} />
            )}
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

interface IWithDataProps {
  show: boolean;
  userId: string;
  onClose?: () => void;
  backPath?: string;
  backState?: any;
}

const UserInfoModalWithData: React.FC<IWithDataProps> = ({
  show,
  userId,
  onClose,
  backPath,
  backState,
}: IWithDataProps) => {
  const { data, loading, error } = useQuery(USER_INFO, { variables: { userId } });
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleBack = useCallback(
    () => backPath && backState && navigate(backPath, { state: backState }),
    [backPath, backState, navigate]
  );

  if (!userId && show) {
    navigate(pathname);
    return null;
  }

  return (
    <UserInfoModal
      show={show}
      data={data}
      loading={loading}
      error={error}
      onClose={onClose}
      onBack={backPath ? handleBack : undefined}
    />
  );
};

export default UserInfoModal;
export { UserInfoModalWithData };
