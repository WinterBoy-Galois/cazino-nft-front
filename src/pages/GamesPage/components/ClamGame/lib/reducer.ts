import { stat } from 'fs';
import { ClamsGameState as GameState } from '../../../../../models/clamsGameState.model';

const calcProfit = (HE: number, SELECTED: number, BETAMOUNT: number) => {
  if (SELECTED === 0) return 0;

  const WINCHANCE = SELECTED / 9;
  const MULTIPLIER = (1 / WINCHANCE) * (1 - HE);

  console.log(HE, SELECTED, BETAMOUNT);

  return BETAMOUNT * MULTIPLIER - BETAMOUNT;
};

export interface ClamGameState {
  amount: number;
  he: number;
  isRunning: boolean;
  over: boolean;
  result: number;
  gameState: GameState;
  profit: number;
  selection: number[];
}

export const getInitialState = (he: number): ClamGameState => ({
  amount: 0.00000001,
  he,
  isRunning: false,
  over: false,
  result: 0,
  gameState: GameState.IDLE,
  profit: calcProfit(he, 0, 0.00000001),
  selection: [],
});

export interface ClamGameAction {
  type:
  | 'SET_AMOUNT'
  | 'RESET'
  | 'START'
  | 'END'
  | 'SET_RESULT'
  | 'CALC_GAME_STATE'
  | 'SELECT_CLAMS'
  | 'SET_GAME_STATE';
  payload?: any;
}

export const clamGameReducer = (state: ClamGameState, action: ClamGameAction): ClamGameState => {
  const { type, payload } = action;

  switch (type) {
    case 'RESET':
      return getInitialState(state.he);

    case 'SET_AMOUNT':
      return {
        ...state,
        amount: payload.amount,
        profit: calcProfit(state.he, state.selection.length, state.amount),
      };

    case 'SELECT_CLAMS':
      return {
        ...state,
        selection: payload.selection,
        profit: calcProfit(state.he, payload.selection.length, state.amount),
      };

    case 'SET_RESULT':
      return {
        ...state,
        result: payload.result,
      };

    case 'START':
      return { ...state, isRunning: true };

    case 'END':
      return { ...state, isRunning: false };

    case 'SET_GAME_STATE':
      return { ...state, gameState: payload.gameState };

    default:
      return state;
  }
};
