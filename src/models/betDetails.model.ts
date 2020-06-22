export interface BetDetails {
  bet: number;
  profit: number;
  profitCut: boolean;
  multiplier: number;
  gameResult: DiceBetResult | MinesBetResult | GoalsBetResult | ClamsBetResult;
}

export interface DiceBetResult {
  target: number;
  over: boolean;
  winChance: number;
  resultFloat: number;
}

export interface MinesBetResult {
  mineCount: number;
  minePositions: number[];
  open: number[];
}

export interface GoalsBetResult {
  difficulty: GoalsDifficulty;
  selections: GoalSelection[];
}

export interface GoalSelection {
  step: number;
  luckySpots: number[];
  selected?: number;
}

export enum GoalsDifficulty {
  GOALS2OUT3 = 'GOALS2OUT3',
  GOALS1OUT2 = 'GOALS1OUT2',
  GOALS1OUT3 = 'GOALS1OUT3',
}

export interface ClamsBetResult {
  selection: number[];
  resultInteger: number;
}
