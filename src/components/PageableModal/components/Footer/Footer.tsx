import React from 'react';
import styles from './Footer.module.scss';
import NavButton from '../NavButton';
import Dot from '../Dot';

interface IProps {
  pageCount: number;
  activePage: number;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const Footer: React.FC<IProps> = ({ pageCount, activePage, onPreviousPage, onNextPage }) => (
  <div className={styles.container}>
    <div>
      <NavButton direction="left" onClick={onPreviousPage} />
    </div>

    <div className={styles.dots}>
      {Array.from(new Array(pageCount)).map((_, i) => (
        <Dot key={i} isActive={i === activePage} />
      ))}
    </div>

    <div>
      <NavButton direction="right" onClick={onNextPage} />
    </div>
  </div>
);

export default Footer;
