import React from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';
import PageHeadline from '../../components/PageHeadline';
import PageContentContainer from '../../components/PageContentContainer';
import DetailsContainer from '../../components/DetailsContainer';
import styles from './ProfilePage.module.scss';
import { useQuery } from '@apollo/react-hooks';
import { ME_STATISTICS } from '../../graphql/queries';
import { useStateValue } from '../../state';
import Statistics from './components/Statistics';
import { useTranslation } from 'react-i18next';
import { ApolloError } from 'apollo-client';
import UserInfo from './components/UserInfo';
import { UserStatistic } from '../../models/userStatistics.model';

interface IProps extends RouteComponentProps {
  userStatistic?: UserStatistic;
  statisticsLoading: boolean;
  statisticsError?: ApolloError;
}

const ProfilePage: React.SFC<IProps> = ({ userStatistic, statisticsLoading, statisticsError }) => {
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
            </DetailsContainer>
            <DetailsContainer background={'DARK'} className={styles.password}>
              Security
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </DetailsContainer>
          </div>
        </div>
      </PageContentContainer>
    </div>
  );
};

const ProfilePageWithData: React.FC<RouteComponentProps> = () => {
  const { data, loading: statisticsLoading, error: statisticsError } = useQuery(ME_STATISTICS);

  return (
    <ProfilePage
      userStatistic={data?.me}
      statisticsLoading={statisticsLoading}
      statisticsError={statisticsError}
    />
  );
};

export default ProfilePage;
export { ProfilePageWithData };
