import React, { Fragment } from 'react';

interface IProps {
  totalBets: number;
  luckyBets: number;
}

const LostBets: React.FC<IProps> = ({ totalBets, luckyBets }) => {
  let lostBets = 0;

  if (totalBets && luckyBets) {
    lostBets = totalBets - luckyBets;
  }

  return <Fragment>{lostBets}</Fragment>;
};

export default LostBets;
