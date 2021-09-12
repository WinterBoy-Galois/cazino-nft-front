import React, { useMemo } from 'react';
import { GoalGameStatus, GoalsDifficulty, IProbability } from '../GoalGame.types';
import { useTranslation } from 'react-i18next';
import { useGoalGameState } from '../GoalGame.provider';
import { updateGoalValue } from '../GoalGame.actions';
import { ProbabilityBlock, StyledButtonGroup } from '../GoalGame.styles';

export const Probability: React.FC<{ status: GoalGameStatus }> = ({ status }) => {
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useGoalGameState();

  const PROBABILITIES: IProbability[] = useMemo(
    () => [
      {
        label: t('goal.high'),
        value: GoalsDifficulty.HIGH,
        summary: t('goal.high_summary'),
      },
      {
        label: t('goal.middle'),
        value: GoalsDifficulty.MIDDLE,
        summary: t('goal.middle_summary'),
      },
      {
        label: t('goal.low'),
        value: GoalsDifficulty.LOW,
        summary: t('goal.low_summary'),
      },
    ],
    [t]
  );
  const items = useMemo(
    () =>
      PROBABILITIES.map(item => ({
        ...item,
        onClick: () => dispatch(updateGoalValue('probability', item.value)),
        checked: state.probability === item.value,
      })),
    [PROBABILITIES, dispatch, state.probability]
  );

  return (
    <ProbabilityBlock>
      {status !== GoalGameStatus.IN_PROGRESS && (
        <StyledButtonGroup name="probability" items={items} />
      )}
    </ProbabilityBlock>
  );
};
