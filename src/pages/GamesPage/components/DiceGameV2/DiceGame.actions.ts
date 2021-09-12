import {
  DiceGameActionType,
  DiceGameState,
  DiceGameBooleanKeys,
  DiceGameStatus,
} from './DiceGame.types';

export const SET_GAME_STATUS: DiceGameActionType = 'diceGame/SET_GAME_STATUS';
export const UPDATE_DICE_VALUE: DiceGameActionType = 'diceGame/UPDATE_DICE_VALUE';
export const TOGGLE_DICE_VALUE: DiceGameActionType = 'diceGame/TOGGLE_DICE_VALUE';
export const RESET_GAME: DiceGameActionType = 'diceGame/RESET_GAME';

export const resetGame = () => ({
  type: RESET_GAME,
});

export const setGameStatus = (payload: DiceGameStatus) => ({
  type: SET_GAME_STATUS,
  payload,
});

export const updateDiceValue = (key: keyof DiceGameState, payload: any) => ({
  type: UPDATE_DICE_VALUE,
  payload: {
    key,
    payload,
  },
});

export const toggleDiceValue = (key: DiceGameBooleanKeys, payload?: boolean) => ({
  type: TOGGLE_DICE_VALUE,
  payload: {
    key,
    payload,
  },
});
