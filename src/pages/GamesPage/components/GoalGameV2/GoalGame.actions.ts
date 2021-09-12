import {
  GoalGameActionType,
  GoalGameState,
  GoalGameBooleanKeys,
  GoalGameStatus,
} from './GoalGame.types';

export const SET_GAME_STATUS: GoalGameActionType = 'diceGame/SET_GAME_STATUS';
export const UPDATE_GOAL_VALUE: GoalGameActionType = 'diceGame/UPDATE_GOAL_VALUE';
export const TOGGLE_GOAL_VALUE: GoalGameActionType = 'diceGame/TOGGLE_GOAL_VALUE';
export const RESET_GAME: GoalGameActionType = 'diceGame/RESET_GAME';

export const resetGame = () => ({
  type: RESET_GAME,
});

export const setGameStatus = (payload: GoalGameStatus) => ({
  type: SET_GAME_STATUS,
  payload,
});

export const updateGoalValue = (key: keyof GoalGameState, payload: any) => ({
  type: UPDATE_GOAL_VALUE,
  payload: {
    key,
    payload,
  },
});

export const toggleGoalValue = (key: GoalGameBooleanKeys, payload?: boolean) => ({
  type: TOGGLE_GOAL_VALUE,
  payload: {
    key,
    payload,
  },
});
