import React from 'react';
import Modal from '../Modal';
import styles from './UserInfoModal.module.scss';
import { useQuery } from '@apollo/react-hooks';
import { USER_INFO } from '../../graphql/queries';

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
      {error ? 'Error' : null}
      {data?.userInfo ? (
        <div>
          {data.userInfo.username}
          <div className={styles.details}>
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Total Wager</div>
              <div className={styles.details__item__value}>{data.userInfo.totalWager}</div>
            </div>
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Total Profit</div>
              <div className={styles.details__item__value}>{data.userInfo.totalProfit}</div>
            </div>
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Most Played</div>
              <div className={styles.details__item__value}>{data.userInfo.mostPlayed}</div>
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
        </div>
      ) : null}
    </Modal>
  );
};

export default UserInfoModal;
