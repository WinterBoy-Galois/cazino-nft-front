import { DiceGameState as GameState } from '../../../../../models/diceGameState.model';

export interface DiceGameState {
  amount: number;
  result: number;
  target: number;
  multiplier: number;
  probability: number;
  gameState: GameState;
  over: boolean;
  isRunning: boolean;
}

export interface DiceGameAction {
  type: 'SET_TARGET' | 'SET_RESULT' | 'SET_GAME_STATE' | 'CALC_GAME_STATE' | 'START' | 'END';
  payload?: any;
}

export const diceGameReducer = (state: DiceGameState, action: DiceGameAction): DiceGameState => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_TARGET':
      return { ...state, target: payload.target, result: 0, gameState: GameState.IDLE };

    case 'SET_RESULT':
      return {
        ...state,
        result: payload.result,
      };

    case 'SET_GAME_STATE':
      return { ...state, gameState: payload.gameState };

    case 'CALC_GAME_STATE':
      return {
        ...state,
        gameState: state.result
          ? (state.over && state.result >= state.target) ||
            (!state.over && state.result <= state.target)
            ? GameState.WON
            : GameState.LOST
          : GameState.IDLE,
      };

    case 'START':
      return { ...state, isRunning: true };

    case 'END':
      return { ...state, isRunning: false };

    default:
      return state;
  }
};
