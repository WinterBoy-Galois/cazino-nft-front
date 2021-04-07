import React from 'react';
import styles from './Balance.module.scss';
import Bitcoin from '../../../../../icons/social/Bitcoin';
import { useStateValue } from '../../../../../../state';
import clsx from 'clsx';

interface IProps {
  value: string;
  onClick?: () => void;
}

const Balance: React.FC<IProps> = ({ value, onClick }) => {
  const [
    {
      sidebar: { isOpen },
    },
  ] = useStateValue();
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={clsx(isOpen ? styles.container_open : styles.container)}>
        <div className={clsx(isOpen ? styles.border_open : styles.border)}>
          <div className={styles.value}>
            <Bitcoin
              className={clsx(isOpen ? styles.icon_open : styles.icon)}
              innerClassName={styles.icon__inner}
            />
            <span>{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
