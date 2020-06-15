import React from 'react';
import PageableModal from '../PageableModal';
import Bet from '../../models/bet.model';
import { useTranslation } from 'react-i18next';
import BetResultsPage from './components/BetResultsPage';
import { BetDetailsPageWithData } from './components/BetDetailsPage/BetDetailsPage';

interface IProps {
  show: boolean;
  bet: Bet;
  onClose?: () => void;
}

const BetDetailsModal: React.SFC<IProps> = ({ show, onClose, bet }) => {
  const { t } = useTranslation(['modals']);

  return (
    <PageableModal
      show={show}
      title={[t('betDetails.title'), 'Bet Results']}
      onClose={onClose}
      pages={[
        <BetDetailsPageWithData key={1} bet={bet} />,
        <BetResultsPage key={2} result={58.67} rollOver={60} gameType={bet?.gameid} />,
      ]}
    />
  );
};

export default BetDetailsModal;
