import React from 'react';
import styles from './Track.module.scss';
import { SliderItem, GetTrackProps } from 'react-compound-slider';

interface IProps {
  source: SliderItem;
  target: SliderItem;
  getTrackProps: GetTrackProps;
}

const Track: React.SFC<IProps> = ({ source, target, getTrackProps }) => {
  return (
    <div
      className={styles.track}
      style={{ top: `${source.percent}%`, height: `${target.percent - source.percent}%` }}
      {...getTrackProps()}
    />
  );
};

export default Track;
