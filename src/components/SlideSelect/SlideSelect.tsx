import React, { useEffect, useState } from 'react';
import styles from './SlideSelect.module.scss';

interface IProps {
  selectItems: {
    label: string;
    onClick: () => void;
  }[];
  selectedItemIndex: number;
}

const SlideSelect: React.SFC<IProps> = ({ selectItems, selectedItemIndex }) => {
  const [tabWidth, setTabWidth] = useState<string>();
  const [tabSelectedTranslate, setTabSelectedTranslate] = useState<string>();

  const handleSelect = (index: number) => {
    setTabSelectedTranslate(`${(index * 100).toString()}%`);
  };

  useEffect(() => {
    setTabWidth(`${(100 / selectItems.length).toString()}%`);
    handleSelect(selectedItemIndex);
  }, [selectItems]);

  return (
    <div className={styles.container}>
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
