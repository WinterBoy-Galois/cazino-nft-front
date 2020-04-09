import React from 'react';
import styles from './Username.module.scss';

interface IProps {
  username: string;
  avatarUrl: string;
  className?: string;
}

const Username: React.SFC<IProps> = ({ username, avatarUrl, className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img className={styles.avatar} src={avatarUrl} alt={username} />
      <span className={`bold ${styles.username}`}>{username}</span>
    </div>
  );
};

export default Username;
