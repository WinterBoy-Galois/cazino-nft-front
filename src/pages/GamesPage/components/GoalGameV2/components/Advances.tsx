import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AdvanceItem,
  AdvancesBlock,
  AdvancesInnerBlock,
  Position,
  SelectionItem,
} from '../GoalGame.styles';
import BitcoinValue from '../../../../../components/BitcoinValue';
import { formatBitcoin } from '../../../../../common/util/format.util';
import { useGenerateBallsArray } from '../GoalGame.utils';
import { GoalGameStatus } from '../GoalGame.types';

export const Advances: React.FC<any> = ({
  profits = [],
  selections = [],
  ballAmount = 2,
  currentStep = 0,
  status = GoalGameStatus.IDLE,
}) => {
  const { t } = useTranslation(['components']);
  const balls = useGenerateBallsArray(ballAmount);
  const getSelection = useCallback(
    (step: number) => {
      const selection = selections.find((item: any) => item.step === step);
      const status = selection
        ? selection?.luckySpots?.includes(selection?.selected)
          ? 'won'
          : 'lost'
        : 'unknown';
      return (
        <Position status={step === currentStep ? 'current' : status}>
          {balls.map((item: number) => (
            <SelectionItem
              key={`selectionItem-${item}`}
              selected={selection?.selected === item}
              status={status}
            />
          ))}
        </Position>
      );
    },
    [balls, currentStep, selections]
  );

  if (status === GoalGameStatus.IDLE) {
    return <div />;
  }

  return (
    <AdvancesBlock>
      <AdvancesInnerBlock>
        {profits.map((item: any) => (
          <AdvanceItem key={item.step} current={false}>
            <span>{getSelection(item.step)}</span>
            <span>{item.multiplier}</span>
            <span>
              {item.profit !== null ? (
                <BitcoinValue value={formatBitcoin(item.profit)} />
              ) : (
                t('goalGameAdvances.unavailable')
              )}
            </span>
          </AdvanceItem>
        ))}
      </AdvancesInnerBlock>
    </AdvancesBlock>
  );
};
