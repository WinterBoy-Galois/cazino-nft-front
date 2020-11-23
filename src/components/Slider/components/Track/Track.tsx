import React from 'react';
import styles from './Track.module.scss';
import { SliderItem, GetTrackProps } from 'react-compound-slider';

interface IProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
  switchColors: boolean;
  disabled?: boolean;
}

const Track: React.FC<IProps> = ({ source, target, switchColors, disabled }) => {
  return (
    <div
      className={`${styles.track} ${switchColors ? styles['track--green'] : styles['track--red']} ${
        disabled ? styles['track--disabled'] : ''
      }`}
      style={{ top: `${source.percent}%`, height: `${target.percent - source.percent}%` }}
    />
  );
};

export default Track;
