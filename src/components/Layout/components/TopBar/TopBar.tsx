import React, { Fragment, useState, useCallback, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TopBar.module.scss';
import Logo from '../../../icons/Logo';
import SidebarToggle from '../SidebarToggle';
import { useStateValue } from '../../../../state';
import SecondaryButton from '../../../SecondaryButton';
import { ButtonSize } from '../../../Button';
import SignIn from '../../../icons/SignIn';
import Avatar from '../../../Avatar';
import UserMenu from '../../../UserMenu';
import { Link } from '@reach/router';
import { useBreakpoint } from '../../../../hooks/useBreakpoint.hook';

interface IProps {
  onSignInClick?: () => void;
  onSignOutClick?: () => void;
}

const TopBar: React.FC<IProps> = ({ onSignInClick, onSignOutClick }) => {
  const { t } = useTranslation(['auth']);
  const [{ sidebar, auth }] = useStateValue();
  const [showMenu, setShowMenu] = useState(false);
  const avatarRef = useRef(null);
  const breakpoint = useBreakpoint();

  const handleCloseMenu = useCallback(() => setShowMenu(false), []);
  const handleToggleMenu = useCallback(() => setShowMenu(!showMenu), [showMenu]);

  const isMobileBreakpoint = useMemo(() => {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
        return true;
      default:
        return false;
    }
  }, [breakpoint]);

  return (
    <Fragment>
      <div className={`container-fluid h-100`}>
        <div className={`row h-100`}>
          <div className={`col-4 ${styles.center}`}>
            <Link to="/">
              <Logo className={styles.logo__size} fillClassName={styles.logo__color} />
            </Link>
          </div>
          <div className={`col-8 ${styles.center} ${styles.right}`}>
            <div
              className={`${styles.details} ${
                !sidebar.isOpen || isMobileBreakpoint ? styles['details--spacing'] : ''
              }`}
            >
              {!auth.user ? (
                <Fragment>
                  <div className={styles.details__button}>
                    <SecondaryButton
                      size={ButtonSize.SMALL}
                      className={styles['sign-in__button']}
                      onClick={onSignInClick}
                    >
                      {t('signIn.headline')}
                    </SecondaryButton>
                  </div>
                  <div onClick={onSignInClick}>
                    <SignIn className={styles['sign-in__icon']} />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <span className={styles['details--spacing']}>{auth.user.username}</span>
                  <Avatar
                    avatarUrl={auth.user.avatarUrl}
                    username={auth.user.username}
                    ref={avatarRef}
                    onClick={handleToggleMenu}
                  />
                </Fragment>
              )}
            </div>

            <SidebarToggle arrowLeft={true} show={!sidebar.isOpen} />
          </div>
        </div>
      </div>

      <UserMenu
        show={showMenu}
        username={auth.user?.username}
        onSignOutClick={onSignOutClick}
        onClose={handleCloseMenu}
        toggleRef={avatarRef}
      />
    </Fragment>
  );
};

export default TopBar;
