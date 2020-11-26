import React from 'react';
import { Link } from '@reach/router';
import clsx from 'clsx';

interface IProps {
  to: string;
  className?: string;
  activeClassName?: string;
}

const NavLink: React.FC<IProps> = ({ children, to, className, activeClassName }) => {
  return (
    <Link
      to={to}
      getProps={({ isCurrent }) => ({
        className: isCurrent ? clsx(className, activeClassName) : clsx(className),
      })}
    >
      {children}
    </Link>
  );
};

export default NavLink;
