import React from 'react';
import PageableModal from '../PageableModal';
import Bet from '../../models/bet.model';
import { useTranslation } from 'react-i18next';
import { BetDetailsPageWithData } from './components/BetDetailsPage/BetDetailsPage';
import { BetResultsPageWithData } from './components/BetResultsPage/BetResultsPage';

interface IProps {
  show: boolean;
  bet: Bet;
  onClose?: () => void;
}

const BetDetailsModal: React.SFC<IProps> = ({ show, onClose, bet }) => {
  const { t } = useTranslation(['modals']);

  if (!bet) {
    return null;
  }

  return (
    <PageableModal
      show={show}
      title={[t('betDetails.title'), 'Bet Results']}
      onClose={onClose}
      pages={[
        <BetDetailsPageWithData key={1} bet={bet} />,
        <BetResultsPageWithData key={2} gameType={bet.gameid} betId={bet.id} />,
      ]}
    />
  );
};

export default BetDetailsModal;
