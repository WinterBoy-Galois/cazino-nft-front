import React from 'react';
import clsx from 'clsx';
import styles from './ExternalLink.module.scss';
import External from '../icons/External';

interface IProps {
  href: string;
  className?: string;
}

const ExternalLink: React.FC<IProps> = ({ className, href, children }) => {
  return (
    <a
      className={clsx(styles.link, className, 'truncate')}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="truncate">{children}</span>
      <External className={styles.icon} />
    </a>
  );
};

export default ExternalLink;
