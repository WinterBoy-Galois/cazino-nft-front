import React from 'react';
import styles from './Copy.module.scss';

interface IProps {
  className?: string;
}

const Copy: React.FC<IProps> = ({ className = styles.default }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.14 13.88" className={className}>
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <path
            data-name="Icon awesome-copy"
            d="M8.67 12.14v1.09a.66.66 0 01-.65.65H.65a.66.66 0 01-.65-.65v-10a.65.65 0 01.65-.63h2v8a1.52 1.52 0 001.52 1.52zm0-9.32V0H4.12a.65.65 0 00-.65.65v10a.65.65 0 00.65.65h7.37a.65.65 0 00.65-.65V3.47H9.32a.65.65 0 01-.65-.65zM12 2L10.16.19A.66.66 0 009.7 0h-.16v2.6h2.6v-.16A.66.66 0 0012 2z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Copy;
