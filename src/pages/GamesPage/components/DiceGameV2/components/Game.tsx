import React, { useCallback, useMemo } from 'react';
import DiceResultScale from '../../../../../components/icons/DiceResultScale';
import Slider from '../../../../../components/Slider';
import { SliderSection, StyledCharacter } from '../DiceGame.styles';
import { useDiceGameState } from '../DiceGame.provider';
import { updateDiceValue } from '../DiceGame.actions';

export const Game = () => {
  const [state, dispatch] = useDiceGameState();
  const disabled = false;
  const minValue = 0;
  const maxValue = 100;
  const target = useMemo(() => state.target, [state.target]);
  const result = useMemo(() => state.result, [state.result]);
  const over = useMemo(() => state.isOver, [state.isOver]);
  const gameState = useMemo(() => state.status, [state.status]);

  const onChangeTarget = useCallback(
    (target: number) => dispatch(updateDiceValue('target', target)),
    [dispatch]
  );

  return (
    <>
      <DiceResultScale result={result} />
      <SliderSection>
        <Slider
          disabled={disabled}
          value={target}
          switchColors={over}
          onChange={onChangeTarget}
          onUpdate={onChangeTarget}
          maxValue={maxValue}
          minValue={minValue}
        />
      </SliderSection>
      <StyledCharacter gameState={gameState} />
    </>
  );
};
