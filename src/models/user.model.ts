import { GameTypes } from './gameTypes.model';

export default interface User {
  id: string;
  username: string;
  avatarUrl: string;
  isActivated: boolean;
  email?: string;
  balance?: number;
  hideUsername?: boolean;
  hideTotalProfit?: boolean;
  hideTotalWager?: boolean;
  totalWager?: number;
  totalProfit?: number;
  mostPlayed?: GameTypes;
  totalBets?: number;
  luckyBets?: number;
  depositAddress?: string;
  refCode?: string;
}
