import { ClamsGameState as GameState } from '../../../../../models/clamsGameState.model';

const calcProfit = (HE: number, SELECTED: number, BETAMOUNT: number) => {
  if (SELECTED === 0) return 0;

  const WINCHANCE = SELECTED / 9;
  const MULTIPLIER = (1 / WINCHANCE) * (1 - HE);

  return BETAMOUNT * MULTIPLIER - BETAMOUNT;
};

export interface ClamGameState {
  amount: number;
  he: number;
  isRunning: boolean;
  over: boolean;
  gameState: GameState;
  profit: number;
  selection: number[];
  winningIndex: number;
}

export const getInitialState = (he: number, amount = 0.00000001): ClamGameState => ({
  amount,
  he,
  isRunning: false,
  over: false,
  gameState: GameState.IDLE,
  profit: calcProfit(he, 0, amount),
  selection: [],
  winningIndex: -1,
});

export interface ClamGameAction {
  type: 'SET_AMOUNT' | 'RESET' | 'START' | 'END' | 'SELECT_CLAMS' | 'SET_GAME_STATE';
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
        profit: calcProfit(state.he, state.selection.length, payload.amount),
      };

    case 'SELECT_CLAMS':
      return {
        ...state,
        selection: payload.selection,
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
