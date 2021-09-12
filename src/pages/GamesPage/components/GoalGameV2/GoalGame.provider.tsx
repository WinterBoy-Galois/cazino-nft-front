import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action, GoalGameState } from './GoalGame.types';
import { initialState, goalGameReducer } from './GoalGame.reducer';
import logger from 'use-reducer-logger';

export const GoalGameContext = createContext<[GoalGameState, Dispatch<Action>]>([
  initialState,
  () => null,
]);

export const GoalGameProvider: React.FC = ({ children }) => {
  const mainState = useReducer(goalGameReducer, initialState);
  return <GoalGameContext.Provider value={mainState}>{children}</GoalGameContext.Provider>;
};

export const useGoalGameState = () => useContext(GoalGameContext);
