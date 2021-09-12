import React, { useMemo } from 'react';
import { ProfitBlock } from '../../GameSection/components/ProfitBlock.component';
import BitcoinValue from '../../../../../components/BitcoinValue';
import { formatBitcoin } from '../../../../../common/util/format.util';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../../../../../common/config';
import { withApollo } from '@apollo/client/react/hoc';
import { useGoalGameState } from '../GoalGame.provider';
import { SETUP_GOAL } from '../../../../../graphql/queries';
import { EventContainer, EventTitle, EventDetails } from '../GoalGame.styles';
import { useKeeperStatus } from '../GoalGame.utils';

interface Props {
  profit: number;
  multiplier: number;
  nextProfit: number;
  nextMultiplier: number;
  isActive: boolean;
}

const Event = withApollo<{ multiplier: string; profit: React.ReactNode }>(props => {
  const { t } = useTranslation(['games']);
  const [state] = useGoalGameState();
  const lastLucky = useMemo(() => state.lastLucky, [state.lastLucky]);
  const goalCache = props.client?.readQuery({
    query: SETUP_GOAL,
  });
  console.log(state);
  console.log(goalCache);
  const eventStatus = useKeeperStatus(lastLucky);

  if (lastLucky === null || !state.animationInProgress) {
    return null;
  }

  return (
    <EventContainer>
      <EventTitle eventStatus={eventStatus}>
        {t(lastLucky ? 'goal_event' : 'oh_try_again')}
      </EventTitle>
      <EventDetails>
        <span>× {props.multiplier}</span>
        <span>{props.profit}</span>
      </EventDetails>
    </EventContainer>
  );
});

export const ControlsAdditional: React.FC<Props> = ({
  profit,
  multiplier,
  nextProfit,
  nextMultiplier,
  isActive,
}) => {
  const { t } = useTranslation(['games']);
  const formattedMultiplier = multiplier?.toFixed(appConfig.goalsMultiplierPrecision);
  const formattedNextMultiplier = nextMultiplier?.toFixed(appConfig.goalsMultiplierPrecision);
  const totalProfitLabel = `${t('goal.profitTotal')} (× ${formattedMultiplier})`;
  const nextProfitLabel = `${t('goal.profitNext')} (× ${formattedNextMultiplier})`;
  const profitValue = useMemo(() => <BitcoinValue value={formatBitcoin(profit)} />, [profit]);
  const nextProfitValue = useMemo(() => <BitcoinValue value={formatBitcoin(nextProfit)} />, [
    nextProfit,
  ]);

  return (
    <>
      <Event multiplier={formattedMultiplier} profit={profitValue} />
      {isActive && (
        <>
          <ProfitBlock label={totalProfitLabel} value={profitValue} />
          <ProfitBlock label={nextProfitLabel} value={nextProfitValue} />
        </>
      )}
    </>
  );
};
