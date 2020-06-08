import React from 'react';
import { SliderItem } from 'react-compound-slider';
import styles from './Tick.module.scss';

interface IProps {
  tick: SliderItem;
  format?: (val: number) => string;
}

const Tick: React.FC<IProps> = ({ tick, format = d => d }) => {
  const offset = '35px';

  return (
    <div
      className={styles.tick}
      style={{
        top: `${tick.percent === 100 ? `calc(${tick.percent}% - ${offset})` : tick.percent}`,
      }}
    >
      {format(tick.value)}
    </div>
  );
};

export default Tick;
