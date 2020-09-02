import React from 'react';

import styles from './EmailActivationStatus.module.scss';
import AccountVerified from '../../../../../../components/icons/AccountVerified';
import AccountUnverified from '../../../../../../components/icons/AccountUnverified';

interface IProps {
  isActivated: boolean;
  email: string;
  className?: string;
}

const EmailActivationStatus: React.FC<IProps> = ({ email, className = '', isActivated }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {isActivated ? (
        <AccountVerified className={styles.icon} />
      ) : (
        <AccountUnverified className={styles.icon} />
      )}
      <span className="truncate">{email}</span>
    </div>
  );
};

export default EmailActivationStatus;
