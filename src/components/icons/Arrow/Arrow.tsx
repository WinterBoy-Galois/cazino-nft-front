import React from 'react';

interface IProps {
  className?: string;
}

const Arrow: React.FC<IProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 26" className={className}>
      <defs>
        <style>{'.cls-1{fill:none;stroke:#f4feff;stroke-linecap:round;stroke-width:3px}'}</style>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="Group_197" data-name="Group 197">
            <path id="Line_23" data-name="Line 23" className="cls-1" d="M1.5 24.5l9-11" />
            <path id="Line_24" data-name="Line 24" className="cls-1" d="M1.5 1.5l9 12" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Arrow;
