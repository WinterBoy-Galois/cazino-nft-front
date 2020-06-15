import React from 'react';
import styles from './Username.module.scss';
import { useTranslation } from 'react-i18next';
import Spinner from '../Spinner';

interface IProps {
  avatarUrl?: string;
  username?: string;
  className?: string;
  onClick?: () => void;
  loading: boolean;
}

const Username: React.SFC<IProps> = ({ username, avatarUrl, className = '', onClick, loading }) => {
  const { t } = useTranslation(['common']);

  const getUsername = () => {
    return username !== null ? username : t('hidden');
  };

  const getUsernameStyle = () => {
    return username !== null ? styles.username : styles.username__hidden;
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.avatar}>
        {!loading && avatarUrl ? (
          <img
            className="w-100 h-100"
            src={avatarUrl}
            alt={getUsername()?.substr(0, 2).toUpperCase() ?? ''}
          />
        ) : (
          <div className={styles.avatar__spinner}>
            <Spinner color={'WHITE'} />
          </div>
        )}
      </div>
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
