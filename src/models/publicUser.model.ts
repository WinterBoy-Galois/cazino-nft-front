import { GameTypes } from './gameTypes.model';

export default interface PublicUser {
  id: string;
  email: string;
  username: string;
  avatarUrl: string;
  totalWager: number;
  totalProfit: number;
  mostPlayed: GameTypes;
  totalBets: number;
  luckyBets: number;
}
