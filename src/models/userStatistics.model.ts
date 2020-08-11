import { GameTypes } from './gameTypes.model';

export interface UserStatistic {
  totalWager: number;
  totalProfit: number;
  mostPlayed: GameTypes;
  totalBets: number;
  luckyBets: number;
}
