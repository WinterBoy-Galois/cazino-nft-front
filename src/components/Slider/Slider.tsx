import React from 'react';
import styles from './Slider.module.scss';
import { Slider as ReactSlider, Rail, Handles, Tracks } from 'react-compound-slider';
import Handle from './components/Handle';
import Track from './components/Track';

interface IProps {
  value?: number;
  disabled?: boolean;
  onUpdate?: (value: number) => void;
  onChange?: (value: number) => void;
  switchColors?: boolean;
}

const domain = [0, 100];

const Slider: React.SFC<IProps> = ({
  value = 50,
  disabled = false,
  onUpdate,
  onChange,
  switchColors = false,
}: IProps) => {
  return (
    <div className={styles.slider__wrapper}>
      <ReactSlider
        vertical
        reversed
        step={0.01}
        domain={domain}
        onUpdate={u => onUpdate && onUpdate(u.length > 0 ? u[0] : 0)}
        onChange={c => onChange && onChange(c.length > 0 ? c[0] : 0)}
        values={[value]}
        className={styles.slider}
        disabled={disabled}
      >
        <Rail>
          {({ getRailProps }) => (
            <div
              className={`${styles.slider__rail} ${
                switchColors ? styles['slider__rail--red'] : styles['slider__rail--green']
              } ${disabled ? styles['slider__rail--disabled'] : ''}`}
              {...getRailProps()}
            />
          )}
        </Rail>

        <Handles>
          {({ handles, getHandleProps }) => (
            <div className={styles['slider-handles']}>
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                  disabled={disabled}
                />
              ))}
            </div>
          )}
        </Handles>

        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div className={styles['slider-tracks']}>
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                  switchColors={switchColors}
                  disabled={disabled}
                />
              ))}
            </div>
          )}
        </Tracks>
      </ReactSlider>
    </div>
  );
};

export default Slider;
