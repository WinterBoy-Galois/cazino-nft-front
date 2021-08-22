import { Reducer } from 'react';
import { Action, DiceGameState, DiceGameStatus } from './DiceGame.types';
import { SET_GAME_STATUS, TOGGLE_DICE_VALUE, UPDATE_DICE_VALUE } from './DiceGame.actions';
import { calcMultiplier, calcProbability, calcProfit } from '../../../../common/util/betCalc.util';

export const initialState: DiceGameState = {
  isLoading: false,
  status: DiceGameStatus.IDLE,
  multiplier: 0,
  probability: 0,
  amount: 0,
  isOver: false,
  target: 50,
  result: 0,
  isInProgress: false,
  error: null,
  he: 0.01,
  profit: 0,
};

const updateTarget = (state: DiceGameState, action: Action): DiceGameState => {
  const probability = calcProbability(action.payload.payload, state.isOver);
  const multiplier = calcMultiplier(probability, state.he);
  const profit = calcProfit(multiplier, state.amount);

  return {
    ...state,
    target: action.payload.payload,
    multiplier,
    profit,
    probability,
  };
};

export const diceGameReducer: Reducer<DiceGameState, Action> = (state, action) => {
  switch (action.type) {
    case SET_GAME_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case TOGGLE_DICE_VALUE:
      return {
        ...state,
        [action.payload]: !state[action.payload as keyof DiceGameState],
      };
    case UPDATE_DICE_VALUE:
      if (action.payload.key === 'target') {
        return updateTarget(state, action);
      }
      return {
        ...state,
        [action.payload.key]: action.payload.payload,
      };
    default:
      return state;
  }
};
