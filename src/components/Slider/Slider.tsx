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
  valueRange?: number[];
  maxValue?: number;
  minValue?: number;
}

const Slider: React.FC<IProps> = ({
  value = 50,
  disabled = false,
  onUpdate,
  onChange,
  switchColors = false,
  valueRange = [0, 100],
  maxValue,
  minValue,
}: IProps) => {
  return (
    <div className={styles.slider__wrapper}>
      <ReactSlider
        mode={(_, next) => {
          if (maxValue && minValue) {
            const nextVal = next[0]?.val;
            const nextKey = next[0]?.key;

            if (nextVal > maxValue) {
              return [
                {
                  key: nextKey,
                  val: maxValue,
                },
              ];
            }

            if (nextVal < minValue) {
              return [
                {
                  key: nextKey,
                  val: minValue,
                },
              ];
            }
          }

          return next;
        }}
        vertical
        reversed
        step={1}
        domain={valueRange}
        onUpdate={(u: any) => onUpdate && onUpdate(u.length > 0 ? u[0] : 0)}
        onChange={(c: any) => onChange && onChange(c.length > 0 ? c[0] : 0)}
        values={[value]}
        className={styles.slider}
        disabled={disabled}
      >
        <Rail>
          {() => (
            <div
              className={`${styles.slider__rail} ${
                switchColors ? styles['slider__rail--red'] : styles['slider__rail--green']
              } ${disabled ? styles['slider__rail--disabled'] : ''}`}
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
                  domain={valueRange}
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
