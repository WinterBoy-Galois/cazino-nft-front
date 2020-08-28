import React from 'react';
import styles from './Avatar.module.scss';
import Spinner from '../Spinner';

interface IProps {
  loading?: boolean;
  avatarUrl?: string;
  username?: string;
  className?: string;
}

const Avatar: React.FC<IProps> = ({ loading = false, avatarUrl, username, className = '' }) => {
  return (
    <div className={`${styles.avatar} ${className}`}>
      {!loading && avatarUrl ? (
        <img
          className="w-100 h-100"
          src={avatarUrl}
          alt={username?.substr(0, 2).toUpperCase() ?? ''}
        />
      ) : (
        <div className={styles.avatar__spinner}>
          <Spinner color={'WHITE'} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
