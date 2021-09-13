import React, { useCallback, useMemo } from 'react';
import { ControlsProps, GoalGameStatus, PieceElement, StartGameProps } from '../GoalGame.types';
import SpinnerButton from '../../../../../components/SpinnerButton';
import { useUserState } from '../../../../../user/UserProvider';
import { AmountBlock, ControlBlock, ControlsContainer, StartGameSpinner } from '../GoalGame.styles';
import BetAmountControl from '../../../../../components/BetAmountControl';
import { updateGoalValue } from '../GoalGame.actions';
import { useGoalGameState } from '../GoalGame.provider';
import { useTranslation } from 'react-i18next';
import { withApollo } from '@apollo/client/react/hoc';

const Amount: PieceElement = ({ state, dispatch, label }) => {
  const [{ user }] = useUserState();
  const value = useMemo(() => state.amount, [state.amount]);
  const onChange = (amount: number) => dispatch(updateGoalValue('amount', amount));
  const min = 0;
  const max = useMemo(() => user?.balance ?? 15, [user?.balance]);

  return (
    <AmountBlock>
      <BetAmountControl label={label} amount={value} min={min} max={max} onChange={onChange} />
    </AmountBlock>
  );
};

const StartGame = withApollo<StartGameProps>(props => {
  const { t } = useTranslation('games');
  const [state] = useGoalGameState();
  const { lastLucky, status } = state;
  const { isLoading, disabled } = props;
  const label = useMemo(() => {
    switch (status) {
      case GoalGameStatus.IDLE:
        return t('goal.start');
      case GoalGameStatus.IN_PROGRESS:
        return t('goal.take_money');
      case GoalGameStatus.GAME_ENDED:
        return lastLucky ? t('goal.play_again') : t('goal.try_again');
    }
  }, [lastLucky, status, t]);

  const onClick = useCallback(() => {
    switch (status) {
      case GoalGameStatus.IDLE:
        return props.onStart();
      case GoalGameStatus.IN_PROGRESS:
        return props.onCashOut();
      case GoalGameStatus.GAME_ENDED:
        return props.onTryAgain();
    }
  }, [status, props]);

  return (
    <ControlBlock>
      <SpinnerButton
        style={{ height: '100%' }}
        onClick={onClick}
        loading={isLoading}
        disabled={disabled}
      >
        {isLoading && <StartGameSpinner />} {label}
      </SpinnerButton>
    </ControlBlock>
  );
});

const OptionalAdvances = () => <div />;

export const Controls: React.FC<ControlsProps> = ({
  onStart,
  onCashOut,
  onTryAgain,
  isLoading,
  disabled,
}) => {
  const { t } = useTranslation('games');
  const [state, dispatch] = useGoalGameState();
  const reusableProps = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  const startGameProps = useMemo(
    () => ({
      ...reusableProps,
      onStart,
      onCashOut,
      onTryAgain,
      isLoading,
      disabled,
    }),
    [disabled, isLoading, onCashOut, onStart, onTryAgain, reusableProps]
  );

  return (
    <ControlsContainer className="row">
      <Amount label={t('goal.amount')} {...reusableProps} />
      <StartGame {...startGameProps} />
      <OptionalAdvances />
    </ControlsContainer>
  );
};
