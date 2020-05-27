import React from 'react';
import styles from './Username.module.scss';

interface IProps {
  avatarUrl: string;
  username?: string;
  className?: string;
}

const Username: React.SFC<IProps> = ({ username, avatarUrl, className = '' }) => {
  const getUsername = () => {
    return username !== null ? username : 'hidden';
  };

  const getUsernameStyle = () => {
    return username !== null ? styles.username : styles.username__hidden;
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <img className={styles.avatar} src={avatarUrl} alt={username} />
      <span className={`text--bold ${getUsernameStyle()}`}>{getUsername()}</span>
    </div>
  );
};

export default Username;
