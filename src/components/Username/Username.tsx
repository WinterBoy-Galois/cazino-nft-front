import React from 'react';
import styles from './Username.module.scss';
import { useTranslation } from 'react-i18next';
import Avatar from '../Avatar';

interface IProps {
  avatarUrl?: string;
  username?: string;
  className?: string;
  onClick?: () => void;
  loading: boolean;
}

const Username: React.FC<IProps> = ({ username, avatarUrl, className = '', onClick, loading }) => {
  const { t } = useTranslation(['common']);

  const getUsername = () => {
    return username !== null ? username : t('hidden');
  };

  const getUsernameStyle = () => {
    return username !== null ? styles.username : styles.username__hidden;
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <Avatar loading={loading} avatarUrl={avatarUrl} className={styles.avatar} />
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
