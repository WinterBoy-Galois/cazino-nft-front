import React from 'react';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import UserStatistics from '../../../../components/UserStatistics';
import CardHeadline from '../../../../components/CardHeadline';
import { useTranslation } from 'react-i18next';
import { UserStatistic } from '../../../../models/userStatistics.model';
import DetailsContainer from '../../../../components/DetailsContainer';

interface IProps {
  userStatistic?: UserStatistic;
  loading: boolean;
  error?: any;
  className?: string;
}

const Statistics: React.FC<IProps> = ({
  userStatistic: userStatistics,
  loading,
  error,
  className = '',
}) => {
  const { t } = useTranslation(['profile', 'auth']);

  return (
    <DetailsContainer background={'DARK'} className={className}>
      <CardHeadline>{t('statistics')}</CardHeadline>
      {loading && <Loading />}

      {(error || !userStatistics) && !loading && <Error>{t('auth:errors.SERVER_ERROR')}</Error>}

      {!loading && !error && userStatistics && <UserStatistics userStatistic={userStatistics} />}
    </DetailsContainer>
  );
};

export default Statistics;
