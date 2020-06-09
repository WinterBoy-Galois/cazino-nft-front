import React from 'react';
import PageableModal from '../PageableModal';
import BetDetailsPage from './components/BetDetailsPage';
import Bet from '../../models/bet.model';
import { useQuery } from '@apollo/react-hooks';
import { USER_INFO_AVATAR_URL } from '../../graphql/queries';
import { ApolloError } from 'apollo-client';
import { useTranslation } from 'react-i18next';
import BetResultsPage from './components/BetResultsPage';

interface IProps {
  show: boolean;
  onClose?: () => void;
  bet: Bet;
  avatarUrl?: string;
  loading: boolean;
  error?: ApolloError;
}

const BetDetailsModal: React.SFC<IProps> = ({ show, onClose, bet, avatarUrl, loading }) => {
  const { t } = useTranslation(['modals']);

  return (
    <PageableModal
      show={show}
      title={[t('betDetails.title'), 'Bet Results']}
      onClose={onClose}
      pages={[
        <BetDetailsPage key={1} bet={bet} avatarUrl={avatarUrl} loading={loading} />,
        <BetResultsPage key={2} result={58.67} rollOver={60} />,
      ]}
    />
  );
};

export default BetDetailsModal;

interface IWithDataProps {
  show: boolean;
  onClose?: () => void;
  bet: Bet;
}

export const BetDetailsModalWithData: React.SFC<IWithDataProps> = props => {
  const { data, loading, error } = useQuery(USER_INFO_AVATAR_URL, {
    variables: { userId: props.bet?.userid },
  });

  return (
    <BetDetailsModal
      {...props}
      avatarUrl={data?.userInfo?.avatarUrl}
      loading={loading}
      error={error}
    />
  );
};
