import { GoalGameState as GameState } from '../../../../../models/goalGameState.model';

export const PROBABILITES = {
  HIGH: 'GOALS2OUT3',
  MIDDLE: 'GOALS1OUT2',
  LOW: 'GOALS1OUT3',
};

export interface GoalGameState {
  amount: number;
  probability: string;
  isRunning: boolean;
  gameState: GameState;
}

export const getInitialState = (): GoalGameState => ({
  amount: 0.00000001,
  probability: PROBABILITES.HIGH,
  isRunning: false,
  gameState: GameState.IDLE,
});

export interface GoalGameAction {
  type: 'SET_AMOUNT' | 'SET_PROBABILITY' | 'RESET' | 'START' | 'END';
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
      return getInitialState();

    case 'START':
      return { ...state, gameState: GameState.IN_PROGRESS };

    case 'END':
      return { ...state };

    default:
      return state;
  }
};
