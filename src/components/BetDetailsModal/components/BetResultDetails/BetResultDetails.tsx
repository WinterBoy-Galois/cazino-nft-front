import React from 'react';
import Bet from '../../../../models/bet.model';

interface IProps {
  bet?: Bet;
}

const BetResultDetails: React.SFC<IProps> = ({ bet }) => {
  return <div>BetResultDetails{bet?.id}</div>;
};

export default BetResultDetails;
