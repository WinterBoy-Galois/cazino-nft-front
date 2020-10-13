import React from 'react';
import styles from './Edit.module.scss';

interface IProps {
  className?: string;
  fillClassName?: string;
}

const Edit: React.FC<IProps> = ({ className = styles.container, fillClassName = styles.fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="M8 0a8 8 0 108 8 8 8 0 00-8-8zM5.8 12H4v-1.8l5.32-5.32 1.8 1.8zm6.72-6.71l-.88.88-1.8-1.8.88-.88a.48.48 0 01.68 0l1.12 1.13a.48.48 0 010 .67z"
            fill="#f59f66"
          />
          <path
            className={fillClassName}
            d="M12.52 4.61L11.4 3.48a.48.48 0 00-.68 0l-.88.88 1.8 1.8.88-.88a.48.48 0 000-.68zM4 10.2V12h1.8l5.32-5.32-1.8-1.8L4 10.2z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Edit;
