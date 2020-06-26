import React from 'react';
import BitcoinValue from '../BitcoinValue';
import { formatProfit } from '../../common/util/format.util';

interface IProps {
  value: number;
}

const BitcoinProfit: React.SFC<IProps> = ({ value }) => {
  const profitClassName = () => {
    if (value === 0) {
      return '';
    } else if (value < 0) {
      return 'text--negative';
    } else if (value > 0) {
      return 'text--positive';
    }
  };

  return <BitcoinValue className={profitClassName()} value={formatProfit(value)} />;
};

export default BitcoinProfit;
