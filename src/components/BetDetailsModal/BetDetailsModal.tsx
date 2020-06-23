import React, { useMemo } from 'react';
import PageableModal from '../PageableModal';
import Bet from '../../models/bet.model';
import { useTranslation } from 'react-i18next';
import { BetDetailsPageWithData } from './components/BetDetailsPage/BetDetailsPage';
import { BetResultsPageWithData } from './components/BetResultsPage/BetResultsPage';
import { ServerSeedPageWithData } from './components/ServerSeedPage/ServerSeedPage';

interface IProps {
  show: boolean;
  bet: Bet;
  onClose?: () => void;
}

const BetDetailsModal: React.SFC<IProps> = ({ show, onClose, bet }) => {
  const { t } = useTranslation(['modals']);
  const pages = useMemo(
    () => [
      <BetDetailsPageWithData key={1} bet={bet} />,
      <BetResultsPageWithData key={2} gameType={bet?.gameid} betId={bet?.id} />,
      <ServerSeedPageWithData key={3} betId={bet?.id} />,
    ],
    [bet]
  );

  if (!bet) {
    return null;
  }

  return (
    <PageableModal
      show={show}
      title={[t('betDetails.title'), 'Bet Results']}
      onClose={onClose}
      pages={pages}
    />
  );
};

export default BetDetailsModal;
