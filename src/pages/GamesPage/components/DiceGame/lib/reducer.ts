import {
  calcMultiplier,
  calcProbability,
  calcProbabilityByMultiplier,
  calcProfit,
  calcTarget,
} from '../../../../../common/util/betCalc.util';
import { DiceGameState as GameState } from '../../../../../models/diceGameState.model';

export const getInitialState: (he: number) => DiceGameState = he => ({
  target: 50,
  result: 0,
  amount: 0,
  multiplier: calcMultiplier(calcProbability(50, false), he),
  probability: calcProbability(50, false),
  gameState: GameState.IDLE,
  over: false,
  isRunning: false,
  he,
  profit: calcProfit(calcMultiplier(calcProbability(50, false), he), 0),
});

export interface DiceGameState {
  amount: number;
  result: number;
  target: number;
  multiplier: number;
  probability: number;
  gameState: GameState;
  over: boolean;
  isRunning: boolean;
  he: number;
  profit: number;
}

export interface DiceGameAction {
  type:
    | 'SET_TARGET'
    | 'SET_RESULT'
    | 'SET_GAME_STATE'
    | 'CALC_GAME_STATE'
    | 'START'
    | 'END'
    | 'SET_PROBABILITY'
    | 'TOGGLE_OVER'
    | 'SET_MULTIPLIER'
    | 'SET_AMOUNT'
    | 'RESET';
  payload?: any;
}

export const diceGameReducer = (state: DiceGameState, action: DiceGameAction): DiceGameState => {
  const { type, payload } = action;
  let multiplier, probability;

  switch (type) {
    case 'SET_TARGET':
      probability = calcProbability(payload.target, state.over);
      multiplier = calcMultiplier(probability, state.he);

      return {
        ...state,
        target: payload.target,
        result: 0,
        gameState: GameState.IDLE,
        probability,
        multiplier: multiplier,
        profit: calcProfit(multiplier, state.amount),
      };

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

    case 'SET_PROBABILITY':
      multiplier = calcMultiplier(payload.probability, state.he);

      return {
        ...state,
        target: calcTarget(payload.probability, state.over),
        result: 0,
        gameState: GameState.IDLE,
        probability: payload.probability,
        multiplier: multiplier,
        profit: calcProfit(multiplier, state.amount),
      };

    case 'SET_MULTIPLIER':
      probability = calcProbabilityByMultiplier(payload.multiplier, state.he);

      return {
        ...state,
        target: calcTarget(probability, state.over),
        result: 0,
        gameState: GameState.IDLE,
        probability: probability,
        multiplier: payload.multiplier,
        profit: calcProfit(payload.multiplier, state.amount),
      };

    case 'TOGGLE_OVER':
      return {
        ...state,
        over: !state.over,
        target: calcTarget(state.probability, !state.over),
      };

    case 'SET_AMOUNT':
      return {
        ...state,
        profit: calcProfit(state.multiplier, payload.amount),
        amount: payload.amount,
      };

    case 'RESET':
      return getInitialState(state.he);

    default:
      return state;
  }
};
