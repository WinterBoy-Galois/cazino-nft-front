import React from 'react';

export type GoalGameBooleanKeys = 'isOver' | 'isLoading' | 'isInProgress';
export type GoalGameActionType =
  | 'diceGame/UPDATE_GOAL_VALUE'
  | 'diceGame/TOGGLE_GOAL_VALUE'
  | 'diceGame/RESET_GAME'
  | 'diceGame/SET_GAME_STATUS';

interface PieceElementProps {
  label?: string;
  state: GoalGameState;
  dispatch: (...args: any[]) => void;
}

type StartGameOwnProps = {
  onStart: () => void;
  onCashOut: () => void;
  onTryAgain: () => void;
  isLoading: boolean;
  disabled: boolean;
};

export type StartGameProps = PieceElementProps & StartGameOwnProps;
export type ControlsProps = StartGameOwnProps;

export type PieceElement = React.FC<PieceElementProps>;
export type StartGameElement = React.FC<StartGameProps>;

export enum GoalGameStatus {
  IDLE = 'IDLE',
  IN_PROGRESS = 'IN_PROGRESS',
  GAME_ENDED = 'GAME_ENDED',
}

export enum GoalsDifficulty {
  HIGH = 'GOALS2OUT3',
  MIDDLE = 'GOALS1OUT2',
  LOW = 'GOALS1OUT3',
}

export enum ProfitCutState {
  WARNING = 'WARNING',
  CUT = 'CUT',
}

export interface GoalsRow {
  step: number;
  luckySpots: number[];
  selected: number;
}

export interface GoalsProfitLine {
  step: number;
  multiplier: number;
  profit: number;
}

export interface Profit {
  multiplier: number;
  profit: number;
}

export interface GoalGameSession {
  betId: string;
  betAmount: number;
  currentStep: number;
  selections: GoalsRow[];
  difficulty: GoalsDifficulty;
  profits: GoalsProfitLine[];
  totalProfit: Profit;
  nextProfit: Profit;
  allowNext: boolean;
  profitCut: ProfitCutState;
}

export type GoalGameState = {
  status: GoalGameStatus;
  session: GoalGameSession | null;
  lastSpot: number | null;
  lastLucky: boolean | null;
  isAlerted: boolean;
  isGameStartedBtnClicked: boolean;
  maxProfit: number;
  error: string | null;
  amount: number;
  probability: GoalsDifficulty;
  animationInProgress: boolean;
};

export interface PlaceBetVariables {
  betId: string;
  selection: number;
  currentStep: number;
}

export type Action = { type: GoalGameActionType; payload?: any };

export interface SetupGoalQuery {
  setupGoal: {
    minProbability: number;
    maxProbability: number;
    he: number;
  };
}

export interface IProbability {
  label: string;
  value: GoalsDifficulty;
  summary: string;
}

export interface GoalSelectionProps {
  ballAmount: number;
  placeBet: (n: number) => void;
}
