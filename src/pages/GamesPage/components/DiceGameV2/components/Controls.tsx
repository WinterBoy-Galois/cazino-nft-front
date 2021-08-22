import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import BetControl from '../../../../../components/BetControl';
import { appConfig } from '../../../../../common/config';
import BetAmountControl from '../../../../../components/BetAmountControl';
import SpinnerButton from '../../../../../components/SpinnerButton';
import { ControlBlock } from '../../GameSection/GameSection.styles';
import { AmountBlock } from '../DiceGame.styles';
import { PieceElement, DirectionElement, StartGameElement, ControlsProps } from '../DiceGame.types';
import { useDiceGameState } from '../DiceGame.provider';
import { toggleDiceValue, updateDiceValue } from '../DiceGame.actions';
import { calcMultiplier } from '../../../../../common/util/betCalc.util';
import { useUserState } from '../../../../../user/UserProvider';

const Probability: PieceElement = ({ label, state, dispatch, minProbability, maxProbability }) => {
  const value = useMemo(() => state.probability, [state.probability]);
  const onChange = useCallback(
    (probability: number) => dispatch(updateDiceValue('probability', probability)),
    [dispatch]
  );

  return (
    <ControlBlock className="col-4 col-xxl-2">
      <BetControl
        label={label}
        icon="PROBABILITY"
        value={value}
        onChange={onChange}
        min={minProbability}
        max={maxProbability}
      />
    </ControlBlock>
  );
};

const Multiplier: PieceElement = ({
  label,
  dispatch,
  state,
  he,
  minProbability: _minProbability,
  maxProbability: _maxProbability,
}) => {
  const value = useMemo(() => state.multiplier, [state.multiplier]);
  const onChange = useCallback(
    (multiplier: number) => dispatch(updateDiceValue('multiplier', multiplier)),
    [dispatch]
  );
  const minProbability = useMemo(() => calcMultiplier(_maxProbability, he), [_maxProbability, he]);
  const maxProbability = useMemo(() => calcMultiplier(_minProbability, he), [_minProbability, he]);

  return (
    <ControlBlock className="col-4 col-xxl-2">
      <BetControl
        label={label}
        icon="MULTIPLIER"
        value={value}
        decimalPlaces={appConfig.diceMultiplierPrecision}
        onChange={onChange}
        min={minProbability}
        max={maxProbability}
      />
    </ControlBlock>
  );
};

const Direction: DirectionElement = ({ labelOver, labelUnder, state, dispatch }) => {
  const value = useMemo(() => state.target, [state.target]);
  const label = useMemo(() => (state.isOver ? labelOver : labelUnder), [
    labelOver,
    labelUnder,
    state.isOver,
  ]);
  const onChange = useCallback(() => dispatch(toggleDiceValue('isOver')), [dispatch]);

  return (
    <ControlBlock className="col-4 col-xxl-2">
      <BetControl label={label} icon="OVER_UNDER" value={value} readonly onClick={onChange} />
    </ControlBlock>
  );
};

const Amount: PieceElement = ({ state, dispatch }) => {
  const [{ user }] = useUserState();
  const value = useMemo(() => state.amount, [state.amount]);
  const onChange = (amount: number) => dispatch(updateDiceValue('amount', amount));
  const min = 0;
  const max = useMemo(() => user?.balance ?? 15, [user?.balance]);

  return (
    <AmountBlock className="col-12 col-xl-6 col-xxl-4 col-xxxl-3">
      <BetAmountControl amount={value} min={min} max={max} onChange={onChange} />
    </AmountBlock>
  );
};

const StartGame: StartGameElement = ({ onStart }) => {
  const isLoading = false;

  return (
    <ControlBlock className="col-12 col-xl-6 col-xxl-2 col-xxxl-3">
      <SpinnerButton style={{ height: '100%' }} onClick={onStart} loading={isLoading}>
        start
      </SpinnerButton>
    </ControlBlock>
  );
};

export const Controls: React.FC<ControlsProps> = ({
  he,
  minProbability,
  maxProbability,
  onStart,
}) => {
  const { t } = useTranslation('games');
  const [state, dispatch] = useDiceGameState();
  const reusableProps = useMemo(
    () => ({
      state,
      dispatch,
      minProbability,
      maxProbability,
      he,
    }),
    [state, dispatch, minProbability, maxProbability, he]
  );

  return (
    <div className="row">
      <Probability label={t('dice.probability')} {...reusableProps} />
      <Multiplier label={t('dice.multiplier')} {...reusableProps} />
      <Direction
        labelOver={t('dice.rollOver')}
        labelUnder={t('dice.rollUnder')}
        {...reusableProps}
      />
      <Amount {...reusableProps} />
      <StartGame {...reusableProps} onStart={onStart} />
    </div>
  );
};
