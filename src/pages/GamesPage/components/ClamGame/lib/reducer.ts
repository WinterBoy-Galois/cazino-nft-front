import { ClamsGameState as GameState } from '../../../../../models/clamsGameState.model';

const calcMultiplier = (HE: number, SELECTED: number) => {
  if (SELECTED === 0) return 0;

  const WINCHANCE = SELECTED / 9;

  return (1 / WINCHANCE) * (1 - HE);
};

const calcProfit = (HE: number, SELECTED: number, BETAMOUNT: number) => {
  const MULTIPLIER = calcMultiplier(HE, SELECTED);

  if (MULTIPLIER === 0) return 0;

  return BETAMOUNT * MULTIPLIER - BETAMOUNT;
};

export interface ClamGameState {
  amount: number;
  he: number;
  isRunning: boolean;
  over: boolean;
  gameState: GameState;
  multiplier: number;
  profit: number;
  selection: number[];
  winningIndex: number;
}

export const getInitialState = (he: number, amount = 0): ClamGameState => ({
  amount,
  he,
  isRunning: false,
  over: false,
  gameState: GameState.IDLE,
  multiplier: calcMultiplier(he, 0),
  profit: calcProfit(he, 0, amount),
  selection: [],
  winningIndex: -1,
});

export interface ClamGameAction {
  type: 'SET_AMOUNT' | 'SET_HE' | 'RESET' | 'START' | 'END' | 'SELECT_CLAMS' | 'SET_GAME_STATE';
  payload?: any;
}

export const clamGameReducer = (state: ClamGameState, action: ClamGameAction): ClamGameState => {
  const { type, payload } = action;

  switch (type) {
    case 'RESET':
      return payload?.restart ? getInitialState(state.he, state.amount) : getInitialState(state.he);

    case 'SET_AMOUNT':
      return {
        ...state,
        amount: payload.amount,
        multiplier: calcMultiplier(state.he, state.selection.length),
        profit: calcProfit(state.he, state.selection.length, payload.amount),
      };

    case 'SET_HE':
      return {
        ...state,
        he: payload.he,
      };

    case 'SELECT_CLAMS':
      return {
        ...state,
        selection: payload.selection,
        multiplier: calcMultiplier(state.he, payload.selection.length),
        profit: calcProfit(state.he, payload.selection.length, state.amount),
      };

    case 'START':
      return { ...state, isRunning: true };

    case 'END':
      return { ...state, isRunning: false };

    case 'SET_GAME_STATE':
      return {
        ...state,
        gameState: payload.gameState,
        winningIndex: 'result' in payload ? payload.result : -1,
      };

    default:
      return state;
  }
};
