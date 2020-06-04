import React from 'react';
import styles from './Username.module.scss';
import { useTranslation } from 'react-i18next';

interface IProps {
  avatarUrl: string;
  username?: string;
  className?: string;
  onClick?: () => void;
}

const Username: React.SFC<IProps> = ({ username, avatarUrl, className = '', onClick }) => {
  const { t } = useTranslation(['common']);

  const getUsername = () => {
    return username !== null ? username : t('hidden');
  };

  const getUsernameStyle = () => {
    return username !== null ? styles.username : styles.username__hidden;
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <img className={styles.avatar} src={avatarUrl} alt={username} />
      <span
        className={`text--bold ${getUsernameStyle()} ${onClick ? styles.link : ''}`}
        onClick={onClick}
      >
        {getUsername()}
      </span>
    </div>
  );
};

export default Username;
