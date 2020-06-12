import { GameTypes } from './gameTypes.model';

export default interface Bet {
  id: string;
  time: number;
  userid: number;
  username: string;
  gameid: GameTypes;
  bet: number;
  profit: number;
  multiplier: number;
}
