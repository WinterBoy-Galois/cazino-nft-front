import React from 'react';

import Spinner from '../Spinner';
import Edit from '../icons/Edit';

import styles from './Avatar.module.scss';

interface IProps {
  loading?: boolean;
  avatarUrl?: string;
  username?: string;
  isEditable?: boolean;
  className?: string;
  onClick?: () => void;
}

const Avatar = React.forwardRef<HTMLDivElement, IProps>(
  ({ loading = false, avatarUrl, username, isEditable = false, className = '', onClick }, ref) => {
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        {...(onClick ? { role: 'button' } : {})}
        className={`${styles.avatar} ${onClick ? styles.avatar__clickable : ''} ${className}`}
        onClick={handleClick}
      >
        {!loading && avatarUrl ? (
          <>
            {isEditable && <Edit className={styles.avatar__editable} />}

            <img
              className="w-100 h-100"
              src={avatarUrl}
              alt={username?.substr(0, 2).toUpperCase() ?? ''}
            />
          </>
        ) : (
          <div className={styles.avatar__spinner}>
            <Spinner color={'WHITE'} />
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
