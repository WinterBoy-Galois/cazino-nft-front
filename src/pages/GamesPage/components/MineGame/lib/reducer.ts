import { MinesGameState as GameState } from '../../../../../models/minesGameState.model';

export interface MinesGameState {
  amount: number;
  mines: number;
  gameState: GameState;
}

export const getInitialState = (): MinesGameState => ({
  amount: 0,
  mines: 1,
  gameState: GameState.IDLE,
});

export interface MinesGameAction {
  type:
    | 'SET_AMOUNT_MINES'
    | 'RESET_MINES'
    | 'START_MINES'
    | 'END_MINES'
    | 'SET_GAME_STATE_MINES'
    | 'SET_MINES';
  payload?: any;
}

export const minesGameReducer = (state: MinesGameState, action: MinesGameAction) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MINES':
      return {
        ...state,
        mines: payload.mines,
      };

    case 'SET_AMOUNT_MINES':
      return {
        ...state,
        amount: payload.amount,
      };

    case 'RESET_MINES':
      return {
        ...getInitialState(),
        amount: state.amount,
        mines: state.mines,
      };

    case 'START_MINES':
      if (payload?.session)
        return {
          ...state,
          gameState: GameState.IN_PROGRESS,
          amount: payload.session.betAmount,
          mines: payload.session.mines,
        };

      return { ...state, gameState: GameState.IN_PROGRESS };

    case 'END_MINES':
      return { ...state, gameState: GameState.GAME_ENDED };

    case 'SET_GAME_STATE_MINES':
      return {
        ...state,
        gameState: payload.gameState,
      };

    default:
      return state;
  }
};
