import React from 'react';

interface IProps {
  className?: string;
  innerClassName?: string;
}

const Goals: React.SFC<IProps> = ({ className, innerClassName }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="7 6 35 35" className={className}>
      <defs>
        <clipPath id="clip-path" transform="translate(6.72 5.85)">
          <circle id="SVGID" cx="17.5" cy="17.5" r="15.5" fill="#fff" />
        </clipPath>
        <style
          dangerouslySetInnerHTML={{
            __html: `
      .cls-4{fill:none}.cls-2{fill:#fff}.cls-3{fill:#091b33}.cls-4{stroke:#091b33;stroke-miterlimit:10;stroke-width:.72px}`,
          }}
        />
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_4" data-name="Layer 4">
          <circle className="cls-2" cx="24.22" cy="23.35" r="17.5" />
          <path
            className="cls-2"
            d="M17.49 32.52a15 15 0 01-3.67-29.58 15.47 15.47 0 013.69-.46 15 15 0 013.66 29.58 15.27 15.27 0 01-3.68.46z"
            transform="translate(6.72 5.85)"
          />
          <path
            className="cls-3"
            d="M17.51 3a14.59 14.59 0 11-3.57.45A14.51 14.51 0 0117.51 3m0-1a15.11 15.11 0 00-3.8.48A15.5 15.5 0 0017.49 33a15.11 15.11 0 003.8-.48A15.5 15.5 0 0017.51 2z"
            transform="translate(6.72 5.85)"
          />
          <path
            className="cls-3"
            d="M17.36 11a25.71 25.71 0 00-6.6 4.64 19.5 19.5 0 002.17 7.21 19.25 19.25 0 007.84.42A26.88 26.88 0 0023.6 16a54 54 0 00-6.24-5z"
            transform="translate(6.72 5.85)"
          />
          <path
            className="cls-4"
            d="M24.22 23.35l-14.1-4.14M24.22 23.35l-9.63 11.1M24.22 23.35l7.69 12.53M24.23 23.37l14.24-3.65M24.22 23.35l-.41-14.68"
          />
          <g clip-path="url(#clip-path)">
            <path
              className="cls-3"
              d="M22.69 26.21a25.33 25.33 0 00-2.81 7.56 19.38 19.38 0 005.86 4.72 19.17 19.17 0 006.7-4.09 26.89 26.89 0 00-1.77-7.6 54 54 0 00-7.98-.59zM28.25 14.75a25.6 25.6 0 006.44 4.86 19.55 19.55 0 006.2-4.28 19.14 19.14 0 00-2-7.59 27.07 27.07 0 00-7.78-.47 54.94 54.94 0 00-2.86 7.48zM17.11 6.62a25.45 25.45 0 006.43-4.87 19.42 19.42 0 00-2.42-7.13 19.13 19.13 0 00-7.85-.14 26.8 26.8 0 00-2.57 7.36 53.65 53.65 0 006.41 4.78zM5.85 14.16a25.38 25.38 0 00-1.48-7.93 19.48 19.48 0 00-7.46-1 19.13 19.13 0 00-3.63 7 27 27 0 005.43 5.6 54.77 54.77 0 007.14-3.67zM11.47 34.17A25.38 25.38 0 0010 26.24a19.56 19.56 0 00-7.46-1 19.23 19.23 0 00-3.63 7 26.82 26.82 0 005.43 5.59 54.24 54.24 0 007.13-3.66z"
              transform="translate(6.72 5.85)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Goals;
