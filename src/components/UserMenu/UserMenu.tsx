import React, { Fragment, useRef, useCallback, MutableRefObject, useMemo } from 'react';
import styles from './UserMenu.module.scss';
import { Link } from '@reach/router';
import { useClickOutside } from '../../hooks/useClickOutside.hook';
import { use100vh } from 'react-div-100vh';
import { useBreakpoint } from '../../hooks/useBreakpoint.hook';
import { useTranslation } from 'react-i18next';

interface IProps {
  username?: string;
  show?: boolean;
  onSignOutClick?: () => void;
  onClose?: () => void;
  toggleRef?: MutableRefObject<any>;
}

const UserMenu: React.FC<IProps> = ({
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
  const height = use100vh();
  const wrapperStyle = useMemo(() => {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
        return { height: `calc(${height}px - 50px)` };
      default:
        return { height: `calc(${height}px - 50px - 74px)` };
    }
  }, [breakpoint, height]);

  return (
    <Fragment>
      {show && (
        <div className={styles.wrapper} style={wrapperStyle}>
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
                <Link onClick={onClose} to="/transactions">
                  {t('menu.transactions')}
                </Link>
              </li>
              <li className={styles.menu__list__item}>
                <Link onClick={onClose} to="/affiliates">
                  {t('menu.affiliates')}
                </Link>
              </li>
              <li className={styles.menu__list__item}>
                <Link onClick={onClose} to="/seeds">
                  {t('menu.seeds')}
                </Link>
              </li>
              <li className={styles.menu__list__item}>
                <button onClick={handleSignOutClick}>{t('menu.signOut')}</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UserMenu;
