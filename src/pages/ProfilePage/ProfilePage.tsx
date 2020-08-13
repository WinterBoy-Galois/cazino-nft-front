import React, { useState } from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';
import PageHeadline from '../../components/PageHeadline';
import PageContentContainer from '../../components/PageContentContainer';
import DetailsContainer from '../../components/DetailsContainer';
import styles from './ProfilePage.module.scss';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ME_STATISTICS } from '../../graphql/queries';
import { useStateValue } from '../../state';
import Statistics from './components/Statistics';
import { useTranslation } from 'react-i18next';
import { ApolloError } from 'apollo-client';
import UserInfo from './components/UserInfo';
import { UserStatistic } from '../../models/userStatistics.model';
import Security from './components/Security';
import ApplicationError from '../../models/applicationError.model';
import { UPDATE_PASSWORD } from '../../graphql/mutations';
import { getFromGraphQLErrors, getFromGenericErrors } from '../../common/util/error.util';
import { success } from '../../components/Toast';

interface IProps extends RouteComponentProps {
  userStatistic?: UserStatistic;
  statisticsLoading: boolean;
  statisticsError?: ApolloError;
  securityLoading: boolean;
  securityErrors?: ApplicationError[];
  onPasswordChange?: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

const ProfilePage: React.SFC<IProps> = ({
  userStatistic,
  statisticsLoading,
  statisticsError,
  securityLoading,
  securityErrors,
  onPasswordChange,
}) => {
  const { t } = useTranslation('profile');
  const [{ auth }] = useStateValue();

  if (!auth.user) {
    return <Redirect noThrow to={'/'} />;
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
            <DetailsContainer background={'DARK'} className={styles.preferences}>
              Preferences
              <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                <label className="custom-control-label" htmlFor="customSwitch1">
                  Toggle this switch element
                </label>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </DetailsContainer>

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
  const { t } = useTranslation(['auth']);
  const { data, loading: statisticsLoading, error: statisticsError } = useQuery(ME_STATISTICS);
  const [updatePassword, { loading: securityLoading }] = useMutation(UPDATE_PASSWORD, {
    variables: { oldPassword: '', newPassword: '' },
  });
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

    success('Password succesfully changed.');
    return true;
  };

  return (
    <ProfilePage
      userStatistic={data?.me}
      statisticsLoading={statisticsLoading}
      statisticsError={statisticsError}
      securityLoading={securityLoading}
      securityErrors={securityErrors}
      onPasswordChange={onPasswordChange}
    />
  );
};

export default ProfilePage;
export { ProfilePageWithData };
