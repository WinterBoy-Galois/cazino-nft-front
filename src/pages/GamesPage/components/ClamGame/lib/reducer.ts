import {
  calcMultiplier,
  calcProbability,
  calcProbabilityByMultiplier,
  calcProfit,
  calcTarget,
} from '../../../../../common/util/betCalc.util';

export interface ClamGameState {
  amount: number;
  he: number;
  isRunning: boolean;
  multiplier: number;
  profit: number;
  over: boolean;
}

export const getInitialState = (he: number): ClamGameState => ({
  amount: 0.00000001,
  he,
  isRunning: false,
  multiplier: calcMultiplier(calcProbability(50, false), he),
  over: false,
  profit: calcProfit(calcMultiplier(calcProbability(50, false), he), 0.00000001),
});

export interface ClamGameAction {
  type: 'SET_AMOUNT' | 'RESET';
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
        profit: calcProfit(state.multiplier, payload.amount),
        amount: payload.amount,
      };

    default:
      return state;
  }
};
