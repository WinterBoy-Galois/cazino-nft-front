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

interface IProps {
  show: boolean;
  userId: string;
  onClose?: () => void;
  onBack?: () => void;
}

const UserInfoModal: React.SFC<IProps> = ({ show, onClose, userId, onBack }) => {
  const { data, loading, error } = useQuery(USER_INFO, { variables: { userId } });

  return (
    <Modal show={show} onClose={onClose} title="User Info">
      {loading ? <Loading /> : null}
      {error || data?.userInfo?.errors || data?.errors ? (
        <Error>Could not load user info.</Error>
      ) : null}
      {data?.userInfo && !data?.userInfo?.errors ? (
        <div>
          <Username
            className={`${styles.username} ${styles['username--mobile']}`}
            username={data.userInfo.username}
            avatarUrl={data.userInfo.avatarUrl}
          />
          <div className={styles.details}>
            <Username
              className={`${styles.username} ${styles['username--desktop']}`}
              username={data.userInfo.username}
              avatarUrl={data.userInfo.avatarUrl}
            />

            <DetailList
              details={[
                {
                  label: 'Total Wager',
                  value: <BitcoinValue value={formatBitcoin(data.userInfo.totalWager)} />,
                },
                {
                  label: 'Total Profit',
                  value: <BitcoinProfit value={data.userInfo.totalProfit} />,
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
          </div>

          <div className={styles.button}>
            {onBack ? (
              <Button onClick={onClose}>Back</Button>
            ) : (
              <div className={styles.button__spacer} />
            )}
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default UserInfoModal;
