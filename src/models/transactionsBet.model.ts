import { GameTypes } from './gameTypes.model';

export default interface TransactionsBet {
  id: string;
  time: number;
  game: GameTypes;
  amount: number;
  multiplier: number;
  profit: number;
}
