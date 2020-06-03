import React from 'react';
import styles from './Username.module.scss';

interface IProps {
  username: string;
  avatarUrl: string;
  className?: string;
  onClick?: () => void;
}

const Username: React.SFC<IProps> = ({ username, avatarUrl, className = '', onClick }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img className={styles.avatar} src={avatarUrl} alt={username} />
      <span
        className={`text--bold ${styles.username} ${onClick ? styles.link : ''}`}
        onClick={onClick}
      >
        {username}
      </span>
    </div>
  );
};

export default Username;
