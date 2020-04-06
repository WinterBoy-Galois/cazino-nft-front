export default interface Bet {
  id: string;
  time: number;
  userid: number;
  username: string;
  gameid: GameTypes;
  bet: number;
  profit: number;
}

export enum GameTypes {
  DICE,
  GOALS,
  MINES,
  CLAMS,
}
