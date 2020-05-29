import React from 'react';
import PageableModal from '../PageableModal';

interface IProps {
  show: boolean;
}

const BetDetailsModal: React.SFC<IProps> = ({ show }) => {
  return <PageableModal show={show} pages={[<div key={1}>Hi</div>]} />;
};

export default BetDetailsModal;
