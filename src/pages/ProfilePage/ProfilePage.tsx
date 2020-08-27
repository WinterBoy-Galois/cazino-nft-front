import React, { useState, useMemo } from 'react';
import { RouteComponentProps, useNavigate } from '@reach/router';
import PageHeadline from '../../components/PageHeadline';
import PageContentContainer from '../../components/PageContentContainer';
import styles from './ProfilePage.module.scss';
import { ME_STATISTICS_PREFERENCES } from '../../graphql/queries';
import { useStateValue } from '../../state';
import Statistics from './components/Statistics';
import { useTranslation } from 'react-i18next';
import { ApolloError, useQuery, useMutation } from '@apollo/client';
import UserInfo from './components/UserInfo';
import { UserStatistic } from '../../models/userStatistics.model';
import Preferences from './components/Preferences';
import Security from './components/Security';
import ApplicationError from '../../models/applicationError.model';
import { UPDATE_PASSWORD, UPDATE_PREFERENCES } from '../../graphql/mutations';
import { getFromGraphQLErrors, getFromGenericErrors } from '../../common/util/error.util';
import { success, error } from '../../components/Toast';
import { Preferences as PreferencesModel } from './components/Preferences/lib/preferences';

interface IProps extends RouteComponentProps {
  userStatistic?: UserStatistic;
  statisticsLoading: boolean;
  statisticsError?: ApolloError;
  securityLoading: boolean;
  securityErrors?: ApplicationError[];
  onPasswordChange?: (oldPassword: string, newPassword: string) => Promise<boolean>;
  preferences?: PreferencesModel;
  onPreferenceChange?: (preferences: PreferencesModel) => void;
}

const ProfilePage: React.SFC<IProps> = ({
  userStatistic,
  statisticsLoading,
  statisticsError,
  securityLoading,
  securityErrors,
  onPasswordChange,
  preferences,
  onPreferenceChange,
}) => {
  const { t } = useTranslation('profile');
  const [{ auth }] = useStateValue();
  const navigate = useNavigate();

  if (!auth.user) {
    navigate('/');
    return null;
  }

  return (
    <div className="container">
      <PageHeadline>{t('pageHeadline')}</PageHeadline>
      <PageContentContainer>
        <div className="row">
          <div className={`col-12 col-lg-6 ${styles.column}`}>
            <UserInfo user={auth.user} className={styles['user-info']} />

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
};

const ProfilePageWithData: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation(['auth', 'profile']);

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

  return (
    <ProfilePage
      userStatistic={data?.me}
      statisticsLoading={statisticsLoading}
      statisticsError={statisticsError}
      securityLoading={securityLoading}
      securityErrors={securityErrors}
      preferences={preferences}
      onPasswordChange={onPasswordChange}
      onPreferenceChange={onUpdatePreferences}
    />
  );
};

export default ProfilePage;
export { ProfilePageWithData };
