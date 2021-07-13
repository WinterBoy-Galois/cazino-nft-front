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
import { useBreakpoint } from '../../../../hooks/useBreakpoint.hook';
import { useNavigate } from '@reach/router';

interface IProps {
  onSignInClick?: () => void;
  onSignOutClick?: () => void;
  isOnlyLeaveLogo?: boolean;
}

const TopBar: React.FC<IProps> = ({ onSignInClick, onSignOutClick, isOnlyLeaveLogo }) => {
  const { t } = useTranslation(['auth']);
  const [{ sidebar, newAuth }] = useStateValue();
  const [showMenu, setShowMenu] = useState(false);
  const avatarRef = useRef(null);
  const breakpoint = useBreakpoint();
  const navigation = useNavigate();

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

  const onClickHome = () => {
    navigation('/');
  };

  return (
    <Fragment>
      <div className={`container-fluid h-100`}>
        <div className={`row h-100`}>
          <div className={`col-4 ${styles.center}`}>
            {/*<Link to="/">*/}
            {/*  <Logo className={styles.logo__size} fillClassName={styles.logo__color} />*/}
            {/*</Link>*/}
            <div className={styles.mouse_cursor} onClick={onClickHome}>
              <Logo className={styles.logo__size} fillClassName={styles.logo__color} />
            </div>
          </div>
          {!isOnlyLeaveLogo && (
            <div className={`col-8 ${styles.center} ${styles.right}`}>
              <div
                className={`${styles.details} ${
                  !sidebar.isOpen || isMobileBreakpoint ? styles['details--spacing'] : ''
                }`}
              >
                {!newAuth.user ? (
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
                    <span className={styles['details--spacing']}>{newAuth.user.username}</span>
                    <Avatar
                      avatarUrl={newAuth.user.avatarUrl}
                      username={newAuth.user.username}
                      ref={avatarRef}
                      onClick={handleToggleMenu}
                    />
                  </Fragment>
                )}
              </div>

              <SidebarToggle arrowLeft={true} show={!sidebar.isOpen} />
            </div>
          )}
        </div>
      </div>

      <UserMenu
        show={showMenu}
        username={newAuth.user?.username}
        onSignOutClick={onSignOutClick}
        onClose={handleCloseMenu}
        toggleRef={avatarRef}
      />
    </Fragment>
  );
};

export default TopBar;
