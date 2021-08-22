import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action, DiceGameState } from './DiceGame.types';
import { initialState, diceGameReducer } from './DiceGame.reducer';
import logger from 'use-reducer-logger';

export const DiceGameContext = createContext<[DiceGameState, Dispatch<Action>]>([
  initialState,
  () => null,
]);

export const DiceGameProvider: React.FC = ({ children }) => {
  const mainState = useReducer(logger(diceGameReducer), initialState);
  return <DiceGameContext.Provider value={mainState}>{children}</DiceGameContext.Provider>;
};

export const useDiceGameState = () => useContext(DiceGameContext);
