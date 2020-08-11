import React, { Fragment } from 'react';
import styles from './UserInfo.module.scss';
import CardHeadline from '../../../../components/CardHeadline';
import User from '../../../../models/user.model';
import SecondaryButton from '../../../../components/SecondaryButton';
import { useNavigate, useLocation } from '@reach/router';
import Avatar from '../../../../components/Avatar';
import EmailActivationStatus from './component/EmailActivationStatus';
import DetailsContainer from '../../../../components/DetailsContainer';

interface IProps {
  user: User;
  className?: string;
}

const UserInfo: React.SFC<IProps> = ({ user, className = '' }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <DetailsContainer background={'DARK'} className={className}>
      <CardHeadline>User info</CardHeadline>
      <div className={styles.container}>
        <Avatar avatarUrl={user.avatarUrl} />

        <h3 className={styles.username}>{user.username}</h3>

        <EmailActivationStatus
          className={styles.status}
          email={user.email ?? ''}
          isActivated={user.isActivated}
        />

        {!user.isActivated && (
          <Fragment>
            <div className={styles.error}>
              Your e-mail is not verified. Press the button to send activation code.
            </div>

            <SecondaryButton
              className={styles.button}
              onClick={() => navigate(`${pathname}?dialog=activation`)}
            >
              Activate
            </SecondaryButton>
          </Fragment>
        )}
      </div>
    </DetailsContainer>
  );
};

export default UserInfo;
