import React, { useState, useMemo } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { ApolloError, useQuery, useMutation } from '@apollo/client';

import { appConfig } from '../../common/config';
import { getFromGraphQLErrors, getFromGenericErrors } from '../../common/util/error.util';
import PageHeadline from '../../components/PageHeadline';
import Statistics from './components/Statistics';
import UserInfo from './components/UserInfo';
import { UserStatistic } from '../../models/userStatistics.model';
import ApplicationError from '../../models/applicationError.model';
import PageContentContainer from '../../components/PageContentContainer';
import Preferences from './components/Preferences';
import Security from './components/Security';
import { success, error } from '../../components/Toast';
import { Preferences as PreferencesModel } from './components/Preferences/lib/preferences';
import { ME_STATISTICS_PREFERENCES } from '../../graphql/queries';
import { UPDATE_PASSWORD, UPDATE_PREFERENCES, UPDATE_AVATAR } from '../../graphql/mutations';

import styles from './ProfilePage.module.scss';
import { updateUserAction } from '../../user/user.actions';
import { useUserState } from '../../user/UserProvider';
import User from '../../models/user.model';

interface IProps extends RouteComponentProps {
  userStatistic?: UserStatistic;
  statisticsLoading: boolean;
  statisticsError?: ApolloError;
  securityLoading: boolean;
  securityErrors?: ApplicationError[];
  preferences?: PreferencesModel;
  avatarUrl?: string;
  onPasswordChange?: (oldPassword: string, newPassword: string) => Promise<boolean>;
  onPreferenceChange?: (preferences: PreferencesModel) => void;
  onAvatarChange?: (index: number) => void;
  user?: User;
}

const ProfilePage: React.FC<IProps> = ({
  userStatistic,
  statisticsLoading,
  statisticsError,
  securityLoading,
  securityErrors,
  preferences,
  onPasswordChange,
  onPreferenceChange,
  onAvatarChange,
  user,
}) => {
  const { t } = useTranslation('profile');
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return <div />;
  } else {
    return (
      <div className="container">
        <PageHeadline>{t('pageHeadline')}</PageHeadline>
        <PageContentContainer>
          <div className="row">
            <div className={`col-12 col-lg-6 ${styles.column}`}>
              <UserInfo
                user={user}
                className={styles['user-info']}
                onAvatarChange={onAvatarChange}
              />

              <Statistics
                loading={statisticsLoading}
                userStatistic={userStatistic}
                error={statisticsError}
              />
            </div>
            <div className={`col-12 col-lg-6 ${styles.column}`}>
              <Preferences
                className={styles.preferences}
                preferences={preferences}
                loading={statisticsLoading}
                onPreferenceChange={onPreferenceChange}
              />

              <Security
                loading={securityLoading}
                errors={securityErrors}
                className={styles.password}
                onPasswordChange={onPasswordChange}
              />
            </div>
          </div>
        </PageContentContainer>
      </div>
    );
  }
};

const ProfilePageWithData: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation(['auth', 'profile']);
  const [{ user }, userDispatch] = useUserState();

  const { data, loading: statisticsLoading, error: statisticsError } = useQuery(
    ME_STATISTICS_PREFERENCES
  );
  const [updatePassword, { loading: securityLoading }] = useMutation(UPDATE_PASSWORD);
  const [securityErrors, setSecurityErrors] = useState<ApplicationError[]>();
  const onPasswordChange = async (oldPassword: string, newPassword: string) => {
    setSecurityErrors([]);
    const { data, errors } = await updatePassword({ variables: { oldPassword, newPassword } });

    if (errors) {
      setSecurityErrors(getFromGraphQLErrors(errors, t));
      return false;
    } else if (data?.modifyPassword?.errors) {
      setSecurityErrors(getFromGenericErrors(data.modifyPassword.errors, t));
      return false;
    }

    success(t('profile:security.successToast'));
    return true;
  };

  const [preferences, setPreferences] = useState<PreferencesModel>();
  const [updatePreferences] = useMutation(UPDATE_PREFERENCES);
  const [updateAvatar] = useMutation(UPDATE_AVATAR);
  const onUpdatePreferences = async ({ hideUsername, hideProfit, hideWager }: PreferencesModel) => {
    const oldPreferences = preferences;
    setPreferences({
      hideUsername,
      hideProfit,
      hideWager,
    });

    const { data, errors } = await updatePreferences({
      variables: { hideUsername, hideProfit, hideWager },
    });

    if (errors || data?.modifyPreferences.errors) {
      setPreferences(oldPreferences);
      return error(t('profile:preferences.errorToast'));
    }
  };
  useMemo(
    () =>
      data &&
      setPreferences({
        hideUsername: data.me.hideUsername,
        hideProfit: data.me.hideTotalProfit,
        hideWager: data.me.hideTotalWager,
      }),
    [data]
  );

  const onAvatarChange = async (index: number) => {
    const oldAvatarUrl = user?.avatarUrl;

    const { data, errors } = await updateAvatar({
      variables: { index },
    });

    userDispatch(updateUserAction({ avatarUrl: appConfig.avatarUrls[index - 1] }));

    if (errors || data?.modifyAvatar.errors) {
      userDispatch(updateUserAction({ avatarUrl: oldAvatarUrl }));
      return error(t('profile:userInfo.errorToast'));
    }

    return true;
  };

  return (
    <ProfilePage
      user={user}
      userStatistic={data?.me}
      statisticsLoading={statisticsLoading}
      statisticsError={statisticsError}
      securityLoading={securityLoading}
      securityErrors={securityErrors}
      preferences={preferences}
      onPasswordChange={onPasswordChange}
      onPreferenceChange={onUpdatePreferences}
      onAvatarChange={onAvatarChange}
    />
  );
};

export default ProfilePage;
export { ProfilePageWithData };
