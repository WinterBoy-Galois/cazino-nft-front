import React from 'react';
import { ProfitBlock } from '../../GameSection/components/ProfitBlock.component';
import BitcoinValue from '../../../../../components/BitcoinValue';
import { formatBitcoin } from '../../../../../common/util/format.util';

export const ControlsAdditional: React.FC<{ profit: number }> = ({ profit }) => (
  <ProfitBlock label="Profit of Win" value={<BitcoinValue value={formatBitcoin(profit)} />} />
);
