import { Reducer } from 'react';
import { Action, GoalGameState, GoalGameStatus, GoalsDifficulty } from './GoalGame.types';
import {
  RESET_GAME,
  SET_GAME_STATUS,
  TOGGLE_GOAL_VALUE,
  UPDATE_GOAL_VALUE,
} from './GoalGame.actions';

export const initialState: GoalGameState = {
  isLoading: false,
  status: GoalGameStatus.IDLE,
  session: null,
  lastSpot: null,
  lastLucky: null,
  isCashOut: false,
  isAlerted: false,
  isGameStartedBtnClicked: false,
  maxProfit: 0,
  error: null,
  amount: 0,
  probability: GoalsDifficulty.MIDDLE,
  currentStep: 0,
  animationInProgress: false,
};

export const goalGameReducer: Reducer<GoalGameState, Action> = (state, action) => {
  switch (action.type) {
    case RESET_GAME:
      return {
        ...initialState,
        amount: state.amount,
        probability: state.probability,
      };
    case SET_GAME_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case TOGGLE_GOAL_VALUE:
      return {
        ...state,
        [action.payload]:
          action.payload.payload !== undefined
            ? action.payload.payload
            : !state[action.payload.key as keyof GoalGameState],
      };
    case UPDATE_GOAL_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.payload,
      };
    default:
      return state;
  }
};
