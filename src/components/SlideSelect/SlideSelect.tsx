import React, { useEffect, useState } from 'react';
import styles from './SlideSelect.module.scss';
import clsx from 'clsx';

interface IProps {
  selectItems: {
    label: string;
    onClick: () => void;
  }[];
  className?: string;
}

const SlideSelect: React.FC<IProps> = ({ selectItems, className }) => {
  const [tabWidth, setTabWidth] = useState<string>();
  const [tabSelectedTranslate, setTabSelectedTranslate] = useState<string>('0');

  const handleSelect = (index: number) => {
    setTabSelectedTranslate(`${(index * 100).toString()}%`);
  };

  useEffect(() => {
    setTabWidth(`${(100 / selectItems.length).toString()}%`);
  }, [selectItems]);

  return (
    <div className={clsx(styles.container, className)}>
      <span
        className={`${styles.tab} ${styles['tab--selected']}`}
        style={{ width: tabWidth, transform: `translateX(${tabSelectedTranslate})` }}
      />
      {selectItems.map((s, i) => (
        <span
          key={`slide-select-${s.label}-${i}`}
          className={styles.tab}
          style={{ width: tabWidth }}
          onClick={() => {
            handleSelect(i);
            s.onClick();
          }}
        >
          {s.label}
        </span>
      ))}
    </div>
  );
};

export default SlideSelect;
