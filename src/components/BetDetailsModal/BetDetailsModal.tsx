import React from 'react';
import PageableModal from '../PageableModal';
import BetDetailsPage from './components/BetDetailsPage';
import { GameTypes } from '../../models/bet';

interface IProps {
  show: boolean;
}

const BetDetailsModal: React.SFC<IProps> = ({ show }) => {
  return (
    <PageableModal
      show={show}
      title="Bet Details"
      pages={[
        <BetDetailsPage
          key={1}
          bet={{
            id: '278192',
            username: 'gutierrezbrian',
            time: 1591032136876,
            userid: 67,
            gameid: GameTypes.MINES,
            bet: 0.00009425,
            profit: 0.00002852,
            multiplier: 1.3026315789473684,
          }}
        />,
      ]}
    />
  );
};

export default BetDetailsModal;
