import React from 'react';
import styles from './GameButton.module.scss';
import { useTranslation } from 'react-i18next';

interface IProps {
  onClick?: () => void;
  headline: string;
  className?: string;
}

const GameButton: React.FC<IProps> = ({ onClick, children, headline, className }) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.container} ${className}`} onClick={onClick}>
      <h2 className={styles.headline}>{headline}</h2>
      <span className={styles.subline}>{t('play')}</span>
      {children}
    </div>
  );
};

export default GameButton;
