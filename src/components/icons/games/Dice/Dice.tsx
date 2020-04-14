import React from 'react';

interface IProps {
  className?: string;
  innerClassName?: string;
}

const Dice: React.SFC<IProps> = ({ className, innerClassName }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className={className}>
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html: `.cls-1{fill:#fff}`,
          }}
        />
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_3" data-name="Layer 3">
          <circle className="cls-1" cx="17.5" cy="17.5" r="17.5" />
          <rect x="5.5" y="5.5" width="24" height="24" rx="2.09" fill="#091b33" />
          <circle className="cls-1" cx="11.94" cy="11.94" r="2.68" />
          <circle className="cls-1" cx="23.06" cy="11.94" r="2.68" />
          <circle className="cls-1" cx="11.94" cy="23.06" r="2.68" />
          <circle className="cls-1" cx="23.06" cy="23.06" r="2.68" />
        </g>
      </g>
    </svg>
  );
};

export default Dice;
