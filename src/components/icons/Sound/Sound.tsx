import React from 'react';
import styles from './Sound.module.scss';

interface IProps {
  className?: string;
  sound: boolean;
}

const Sound: React.FC<IProps> = ({ className, sound }) => {
  return (
    <>
      {sound ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272.73 272.73" className={className}>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <rect className={styles['cls-1']} width="272.73" height="272.73" />
              <path
                className={styles['cls-2']}
                d="M65.06,185.42h-30a19.76,19.76,0,0,1-19.74-19.74V107.05A19.76,19.76,0,0,1,35.05,87.31h30a5,5,0,0,1,5,5v88.11A5,5,0,0,1,65.06,185.42Zm-30-88.11a9.75,9.75,0,0,0-9.74,9.74v58.63a9.75,9.75,0,0,0,9.74,9.74h25V97.31Z"
              />
              <path
                className={styles['cls-2']}
                d="M159.29,234.18a20.78,20.78,0,0,1-9.85-2.51L62.69,184.82a5,5,0,0,1-2.63-4.4V92.31a5,5,0,0,1,2.63-4.4l86.75-46.85A20.7,20.7,0,0,1,180,59.28V213.45a20.76,20.76,0,0,1-20.69,20.73ZM70.06,177.43l84.13,45.44A10.71,10.71,0,0,0,170,213.45V59.28a10.71,10.71,0,0,0-15.79-9.42L70.06,95.29Z"
              />
              <path
                className={styles['cls-2']}
                d="M216.3,193a4.93,4.93,0,0,1-2.1-.47,5,5,0,0,1-2.43-6.64c15-32.25,15-64.66-.05-99.08a5,5,0,1,1,9.17-4c16,36.68,16,72.78,0,107.3A5,5,0,0,1,216.3,193Z"
              />
              <path
                className={styles['cls-2']}
                d="M196.63,177.19a5,5,0,0,1-4.53-7.11c10.22-22,10.2-44.06,0-67.54a5,5,0,0,1,9.17-4c11.3,25.89,11.29,51.38-.05,75.75A5,5,0,0,1,196.63,177.19Z"
              />
              <path
                className={styles['cls-2']}
                d="M237.87,206.14a4.93,4.93,0,0,1-2.1-.47,5,5,0,0,1-2.43-6.64c19-40.84,19-81.87-.05-125.44a5,5,0,0,1,9.17-4c20,45.7,19.94,90.67-.05,133.65A5,5,0,0,1,237.87,206.14Z"
              />
            </g>
          </g>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272.73 272.73" className={className}>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                className={styles['cls-2']}
                d="M79,176.34H74.31a16.1,16.1,0,0,1-16.09-16.08V116.17a16.11,16.11,0,0,1,16.09-16.08H96.88a5,5,0,0,1,5,5v47.07h-10V110.09H74.31a6.09,6.09,0,0,0-6.09,6.08v44.09a6.09,6.09,0,0,0,6.09,6.08H79Z"
              />
              <path
                className={styles['cls-2']}
                d="M101.88,152.16h-10V105.09a5,5,0,0,1,2.62-4.4l65.23-35.23a16.75,16.75,0,0,1,21.43,4.68l-8,6a6.81,6.81,0,0,0-8.7-1.91l-62.61,33.81Z"
              />
              <path
                className={styles['cls-2']}
                d="M167.73,213a16.84,16.84,0,0,1-8-2L99.45,178.42l4.75-8.8,60.29,32.55a6.8,6.8,0,0,0,10-6V96.31h10v99.87A16.85,16.85,0,0,1,167.73,213Z"
              />
              <path
                className={styles['cls-2']}
                d="M136.36,250.72A114.36,114.36,0,1,1,250.72,136.36,114.49,114.49,0,0,1,136.36,250.72Zm0-218.71A104.36,104.36,0,1,0,240.72,136.36,104.47,104.47,0,0,0,136.36,32Z"
              />
              <rect
                className={styles['cls-2']}
                x="17.83"
                y="120.4"
                width="214.18"
                height="10"
                transform="translate(-52.08 125.06) rotate(-45)"
              />
              <rect
                className={styles['cls-2']}
                x="30.59"
                y="133.16"
                width="214.18"
                height="10"
                transform="translate(-57.37 137.82) rotate(-45)"
              />
              <rect className={styles['cls-1']} width="272.73" height="272.73" />
            </g>
          </g>
        </svg>
      )}
    </>
  );
};

export default Sound;