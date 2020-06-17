export interface BetDetails {
  bet: number;
  profit: number;
  profitCut: boolean;
  multiplier: number;
  gameResult: DiceBetResult | MinesBetResult;
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
  open: boolean;
}
