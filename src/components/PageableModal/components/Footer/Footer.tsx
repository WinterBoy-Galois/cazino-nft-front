import React from 'react';
import styles from './Footer.module.scss';
import NavButton from '../NavButton';

interface IProps {
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const Footer: React.FC<IProps> = ({ onPreviousPage, onNextPage }) => (
  <div className={styles.container}>
    <div>
      <NavButton direction="left" onClick={onPreviousPage} />
    </div>

    <div>mid</div>

    <div>
      <NavButton direction="right" onClick={onNextPage} />
    </div>
  </div>
);

export default Footer;
