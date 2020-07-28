import React from 'react';
import Modal from '../Modal';
import styles from './UserInfoModal.module.scss';
import { useQuery } from '@apollo/react-hooks';
import { USER_INFO } from '../../graphql/queries';
import Username from '../Username';
import BitcoinValue from '../BitcoinValue';
import { formatBitcoin } from '../../common/util/format.util';
import Button from '../Button';
import Loading from '../Loading';
import Error from '../Error';
import DetailList from '../DetailList';
import GameIconAndText from '../GameIconAndText';
import BitcoinProfit from '../BitcoinProfit';
import LostBets from '../LostBets';
import { ApolloError } from 'apollo-client';
import { useTranslation } from 'react-i18next';
import DetailsContainer from '../DetailsContainer';
import { useLocation, Redirect } from '@reach/router';

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
  const { t } = useTranslation(['common']);

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

            <DetailList
              details={[
                {
                  label: 'Total Wager',
                  value:
                    data.userInfo.totalWager !== null ? (
                      <BitcoinValue value={formatBitcoin(data.userInfo.totalWager)} />
                    ) : (
                      <div className={styles.username__hidden}>{t('hidden')}</div>
                    ),
                },
                {
                  label: 'Total Profit',
                  value:
                    data.userInfo.totalProfit !== null ? (
                      <BitcoinProfit value={data.userInfo.totalProfit} />
                    ) : (
                      <div className={styles.username__hidden}>{t('hidden')}</div>
                    ),
                },
                {
                  label: 'Most Played',
                  value: <GameIconAndText game={data.userInfo.mostPlayed} />,
                },
                {
                  label: 'Total Bets',
                  value: data.userInfo.totalBets,
                },
                {
                  label: 'Won Bets',
                  value: data.userInfo.luckyBets,
                },
                {
                  label: 'Lost Bets',
                  value: (
                    <LostBets
                      totalBets={data.userInfo.totalBets}
                      luckyBets={data.userInfo.luckyBets}
                    />
                  ),
                },
              ]}
            />
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
  onBack?: () => void;
}

const UserInfoModalWithData: React.FC<IWithDataProps> = ({
  show,
  userId,
  onClose,
  onBack,
}: IWithDataProps) => {
  const { data, loading, error } = useQuery(USER_INFO, { variables: { userId } });
  const location = useLocation();

  if (!userId) {
    return <Redirect noThrow to={`${location.pathname}`} />;
  }

  return (
    <UserInfoModal
      show={show}
      data={data}
      loading={loading}
      error={error}
      onClose={onClose}
      onBack={onBack}
    />
  );
};

export default UserInfoModal;
export { UserInfoModalWithData };
