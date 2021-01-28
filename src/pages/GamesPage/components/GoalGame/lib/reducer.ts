import { GoalGameState as GameState } from '../../../../../models/goalGameState.model';

export const PROBABILITY_HIGH = 'GOALS2OUT3';
export const PROBABILITY_MIDDLE = 'GOALS1OUT2';
export const PROBABILITY_LOW = 'GOALS1OUT3';

export interface GoalGameState {
  amount: number;
  probability: string;
  gameState: GameState;
}

export const getInitialState = (): GoalGameState => ({
  amount: 0,
  probability: PROBABILITY_HIGH,
  gameState: GameState.IDLE,
});

export interface GoalGameAction {
  type: 'SET_AMOUNT' | 'SET_PROBABILITY' | 'RESET' | 'START' | 'END' | 'SET_GAME_STATE';
  payload?: any;
}

export const goalGameReducer = (state: GoalGameState, action: GoalGameAction) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_AMOUNT':
      return {
        ...state,
        amount: payload.amount,
      };

    case 'SET_PROBABILITY':
      return {
        ...state,
        probability: payload.probability,
      };

    case 'RESET':
      return {
        ...getInitialState(),
        amount: state.amount,
        probability: state.probability,
      };

    case 'START':
      if (payload?.session)
        return {
          ...state,
          gameState: GameState.IN_PROGRESS,
          amount: payload.session.betAmount,
          probability: payload.session.difficulty,
        };

      return { ...state, gameState: GameState.IN_PROGRESS };

    case 'END':
      return { ...state, gameState: GameState.GAME_ENDED };

    case 'SET_GAME_STATE':
      return {
        ...state,
        gameState: payload.gameState,
      };

    default:
      return state;
  }
};
