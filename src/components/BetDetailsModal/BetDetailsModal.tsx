import React from 'react';
import PageableModal from '../PageableModal';
import BetDetailsPage from './components/BetDetailsPage';
import Bet from '../../models/bet.model';

interface IProps {
  show: boolean;
  onClose?: () => void;
  bet: Bet;
}

const BetDetailsModal: React.SFC<IProps> = ({ show, onClose, bet }) => {
  return (
    <PageableModal
      show={show}
      title="Bet Details"
      onClose={onClose}
      pages={[<BetDetailsPage key={1} bet={bet} />]}
    />
  );
};

export default BetDetailsModal;
