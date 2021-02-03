import React from 'react';
import styles from './Hamburger.module.scss';

interface IProps {
  className?: string;
  isOpened?: boolean;
}

const Hamburger: React.FC<IProps> = ({ className, isOpened }) => {
  if (!isOpened)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.71 23" className={className}>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <g id="Group_773" data-name="Group 773">
              <line
                id="Line_32"
                data-name="Line 32"
                className={styles['cls-1']}
                x1="2.5"
                y1="11.5"
                x2="25.21"
                y2="11.5"
              />
              <line
                id="Line_33"
                data-name="Line 33"
                className={styles['cls-1']}
                x1="2.5"
                y1="2.5"
                x2="25.21"
                y2="2.5"
              />
              <line
                id="Line_34"
                data-name="Line 34"
                className={styles['cls-1']}
                x1="2.5"
                y1="20.5"
                x2="25.21"
                y2="20.5"
              />
            </g>
          </g>
        </g>
      </svg>
    );

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.06 21.06" className={className}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="Group_773" data-name="Group 773">
            <line
              id="Line_33"
              data-name="Line 33"
              className={styles['cls-1']}
              x1="2.5"
              y1="2.5"
              x2="18.56"
              y2="18.56"
            />
            <line
              id="Line_34"
              data-name="Line 34"
              className={styles['cls-1']}
              x1="18.56"
              y1="2.5"
              x2="2.5"
              y2="18.56"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Hamburger;
