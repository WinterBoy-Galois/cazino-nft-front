import React from 'react';
import styles from './Title.module.scss';
import Info from '../../../icons/Info';

interface IProps {
  text: string;
}

const Title: React.FC<IProps> = ({ text }) => {
  return (
    <div className={styles.container}>
      <Info className={styles.icon} />
      {text}
    </div>
  );
};

export default Title;
