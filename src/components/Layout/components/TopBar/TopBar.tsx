import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TopBar.module.scss';
import Logo from '../../../icons/Logo';
import SidebarToggle from '../SidebarToggle';
import { useStateValue } from '../../../../state';
import SecondaryButton from '../../../SecondaryButton';
import { ButtonSize } from '../../../Button';
import SignIn from '../../../icons/SignIn';
import Avatar from '../../../Avatar';

interface IProps {
  onSignInClick?: () => void;
  onSignOutClick?: () => void;
}

const TopBar: React.FC<IProps> = ({ onSignInClick, onSignOutClick }) => {
  const { t } = useTranslation(['auth']);
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
          <div className={`${styles.details} ${!sidebar.isOpen ? styles['details--spacing'] : ''}`}>
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
                <div role="button" onClick={onSignOutClick}>
                  <Avatar avatarUrl={auth.user.avatarUrl} username={auth.user.username} />
                </div>
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
