import React from 'react';
import PageableModal from '../PageableModal';
import BetDetailsPage from './components/BetDetailsPage';
import Bet from '../../models/bet.model';
import { useQuery } from '@apollo/react-hooks';
import { USER_INFO_AVATAR_URL } from '../../graphql/queries';
import { ApolloError } from 'apollo-client';

interface IProps {
  show: boolean;
  onClose?: () => void;
  bet: Bet;
  avatarUrl?: string;
  loading: boolean;
  error?: ApolloError;
}

const BetDetailsModal: React.SFC<IProps> = ({ show, onClose, bet, avatarUrl }) => {
  return (
    <PageableModal
      show={show}
      title="Bet Details"
      onClose={onClose}
      pages={[<BetDetailsPage key={1} bet={bet} avatarUrl={avatarUrl} />]}
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
