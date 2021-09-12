import React from 'react';

export type DiceGameBooleanKeys = 'isOver' | 'isLoading' | 'isInProgress';
export type DiceGameActionType =
  | 'diceGame/UPDATE_DICE_VALUE'
  | 'diceGame/TOGGLE_DICE_VALUE'
  | 'diceGame/RESET_GAME'
  | 'diceGame/SET_GAME_STATUS';

interface PieceElementProps {
  label?: string;
  state: DiceGameState;
  dispatch: (...args: any[]) => void;
  minProbability: number;
  maxProbability: number;
  he: number;
}

export type DirectionProps = Omit<PieceElementProps, 'label'> & {
  labelUnder: string;
  labelOver: string;
};

export type StartGameProps = Omit<PieceElementProps, 'label'> & {
  onStart: () => void;
};

export interface ControlsProps {
  onStart: () => void;
  he: number;
  minProbability: number;
  maxProbability: number;
}

export type PieceElement = React.FC<PieceElementProps>;
export type DirectionElement = React.FC<DirectionProps>;
export type StartGameElement = React.FC<StartGameProps>;

export enum DiceGameStatus {
  IDLE = 'IDLE',
  WON = 'WON',
  LOST = 'LOST',
  HITTING = 'HITTING',
}

export type DiceGameState = {
  isLoading: false;
  multiplier: number;
  probability: number;
  status: DiceGameStatus;
  amount: number;
  isOver: boolean;
  target: number;
  result: number;
  isInProgress: boolean;
  error: string | string[] | null;
  he: number;
  profit: number;
};

export interface PlaceBetVariables {
  betAmount: number;
  target: number;
  over: boolean;
}

export type Action = { type: DiceGameActionType; payload?: any };

export interface SetupDiceQuery {
  setupDice: {
    minProbability: number;
    maxProbability: number;
    he: number;
  };
}
