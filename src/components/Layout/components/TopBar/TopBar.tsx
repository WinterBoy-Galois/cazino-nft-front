import React, { Fragment } from 'react';
import styles from './TopBar.module.scss';
import Logo from '../../../icons/Logo';
import SidebarToggle from '../SidebarToggle';
import { useStateValue } from '../../../../state';
import SecondaryButton from '../../../SecondaryButton';
import { ButtonSize } from '../../../Button';
import SignIn from '../../../icons/SignIn';

interface IProps {
  onSignInClick?: () => void;
  onSignOutClick?: () => void;
}

const TopBar: React.FC<IProps> = ({ onSignInClick, onSignOutClick }) => {
  const [{ sidebar, auth }] = useStateValue();

  return (
    <div className={`container-fluid h-100`}>
      <div className={`row h-100`}>
        <div className={`col-4 ${styles.center}`}>
          <a href="/">
            <Logo className={styles.logo__size} fillClassName={styles.logo__color} />
          </a>
        </div>
        <div className={`col-8 ${styles.center} ${styles.right}`}>
          <div
            className={`${styles['sign-in']} ${!sidebar.isOpen ? styles['sign-in--spacing'] : ''}`}
          >
            {!auth.user ? (
              <Fragment>
                <SecondaryButton
                  size={ButtonSize.SMALL}
                  className={styles['sign-in__button']}
                  onClick={onSignInClick}
                >
                  Sign-in
                </SecondaryButton>
                <div onClick={onSignInClick}>
                  <SignIn className={styles['sign-in__icon']} />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <span>{auth.user.username}</span>
                <SecondaryButton size={ButtonSize.SMALL} onClick={onSignOutClick}>
                  Sign out
                </SecondaryButton>
              </Fragment>
            )}
          </div>
          <SidebarToggle arrowLeft={true} show={!sidebar.isOpen} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
