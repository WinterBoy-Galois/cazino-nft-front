import { GameTypes } from './gameTypes.model';

export interface ServerSeedDetailsOther {
  __typename: string;
  serverSeedHash: string;
}

export interface ServerSeedDetailsOwn {
  __typename: string;
  activeGames: GameTypes[];
  serverSeedHash: string;
  serverSeed: string;
  clientSeed: string;
  nonce: string;
  results: string[];
  verificationUrl: string;
}
