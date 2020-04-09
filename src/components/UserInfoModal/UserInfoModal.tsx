import React from 'react';
import Modal from '../Modal';
import styles from './UserInfoModal.module.scss';
import { useQuery } from '@apollo/react-hooks';
import { USER_INFO } from '../../graphql/queries';
import Username from './components/Username';
import BitcoinValue from '../BitcoinValue';
import { formatProfit, formatBitcoin } from '../../lib/format.extensions';
import GameIcon from '../GameIcon';
import Button from '../Button';

interface IProps {
  show: boolean;
  userId: string;
  onClose?: () => void;
}

const UserInfoModal: React.SFC<IProps> = ({ show, onClose, userId }) => {
  const { data, loading, error } = useQuery(USER_INFO, { variables: { userId } });

  return (
    <Modal show={show} onClose={onClose} title="User Info">
      {loading ? 'Loading' : null}
      {error || data?.userInfo?.errors ? 'Error' : null}
      {data?.userInfo && !data?.userInfo?.errors ? (
        <div>
          <Username
            className={styles.username}
            username={data.userInfo.username}
            avatarUrl={data.userInfo.avatarUrl}
          />
          <div className={styles.details}>
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Total Wager</div>
              <div className={styles.details__item__value}>
                <BitcoinValue value={formatBitcoin(data.userInfo.totalWager)} />
              </div>
            </div>
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Total Profit</div>
              <div className={styles.details__item__value}>
                <BitcoinValue value={formatProfit(data.userInfo.totalProfit)} />
              </div>
            </div>
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Most Played</div>
              <div className={styles.details__item__value}>
                <GameIcon
                  game={data.userInfo.mostPlayed}
                  className={styles['game-icon']}
                  innerClassName={styles['game-icon__inner']}
                />
                {data.userInfo.mostPlayed}
              </div>
            </div>
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Total Bets</div>
              <div className={styles.details__item__value}>{data.userInfo.totalBets}</div>
            </div>
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Won Bets</div>
              <div className={styles.details__item__value}>{data.userInfo.luckyBets}</div>
            </div>
          </div>

          <div className={styles.button}>
            <Button onClick={onClose}>Back</Button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default UserInfoModal;
