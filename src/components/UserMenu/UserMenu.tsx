import React, { Fragment, useRef, useCallback, MutableRefObject, useMemo } from 'react';
import styles from './UserMenu.module.scss';
import { Link } from '@reach/router';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import Div100vh from 'react-div-100vh';
import { useBreakpoint } from '../../hooks/useBreakpoint.hook';
import { useTranslation } from 'react-i18next';

interface IProps {
  username?: string;
  show?: boolean;
  onSignOutClick?: () => void;
  onClose?: () => void;
  toggleRef?: MutableRefObject<any>;
}

const UserMenu: React.SFC<IProps> = ({
  show = false,
  username = '',
  onSignOutClick = () => null,
  onClose = () => null,
  toggleRef,
}) => {
  const { t } = useTranslation(['common']);
  const wrapperRef = useRef(null);
  const refs = toggleRef ? [wrapperRef, toggleRef] : wrapperRef;
  useClickOutside(refs, onClose);

  const handleSignOutClick = useCallback(() => {
    onClose();
    onSignOutClick();
  }, [onClose, onSignOutClick]);

  const breakpoint = useBreakpoint();

  const wrapperStyle = useMemo(() => {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
        return { height: 'calc(100rvh - 50px)' };
      default:
        return { height: 'calc(100rvh - 50px - 74px)' };
    }
  }, [breakpoint]);

  return (
    <Fragment>
      {show && (
        <Div100vh className={styles.wrapper} style={wrapperStyle}>
          <div className={styles.arrow} />

          <div className={styles.container} ref={wrapperRef}>
            <div className={styles.username}>{username}</div>

            <ul className={styles.menu__list}>
              <li className={styles.menu__list__item}>
                <Link onClick={onClose} to="/profile">
                  {t('menu.profile')}
                </Link>
              </li>
              <li className={styles.menu__list__item}>
                <button onClick={handleSignOutClick}>{t('menu.signOut')}</button>
              </li>
            </ul>
          </div>
        </Div100vh>
      )}
    </Fragment>
  );
};

export default UserMenu;
