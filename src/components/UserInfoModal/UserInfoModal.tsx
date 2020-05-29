import React from 'react';
import Modal from '../Modal';
import styles from './UserInfoModal.module.scss';
import { useQuery } from '@apollo/react-hooks';
import { USER_INFO } from '../../graphql/queries';
import Username from './components/Username';
import BitcoinValue from '../BitcoinValue';
import { formatProfit, formatBitcoin } from '../../common/util/format.util';
import GameIcon from '../GameIcon';
import Button from '../Button';
import Loading from '../Loading';
import Error from '../Error';

interface IProps {
  show: boolean;
  userId: string;
  onClose?: () => void;
  onBack?: () => void;
}

const UserInfoModal: React.SFC<IProps> = ({ show, onClose, userId, onBack }) => {
  const { data, loading, error } = useQuery(USER_INFO, { variables: { userId } });

  const profitClassName = () => {
    if (data?.userInfo.totalProfit === 0) {
      return '';
    } else if (data?.userInfo.totalProfit < 0) {
      return 'text--negative';
    } else if (data?.userInfo.totalProfit > 0) {
      return 'text--positive';
    }
  };

  const getLostBets = () => {
    if (!data && !data.userInfo && !(data.userInfo.totalBets || data.userInfo.luckyBets)) {
      return 0;
    }

    const result = data.userInfo.totalBets - data.userInfo.luckyBets;
    return result;
  };

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
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Total Wager</div>
              <div className={styles.details__item__value}>
                <BitcoinValue value={formatBitcoin(data.userInfo.totalWager)} />
              </div>
            </div>
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Total Profit</div>
              <div className={styles.details__item__value}>
                <BitcoinValue
                  className={profitClassName()}
                  value={formatProfit(data.userInfo.totalProfit)}
                />
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
            <div className={styles.details__item}>
              <div className={styles.details__item__label}>Lost Bets</div>
              <div className={styles.details__item__value}>{getLostBets()}</div>
            </div>
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
