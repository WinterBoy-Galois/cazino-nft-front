import { GameTypes } from './gameTypes.model';

export interface ServerSeedDetailsOther {
  __typename: string;
  serverSeedHash: string;
}

export interface ServerSeedDetailsOwn {
  __typename: string;
  serverSeedHash: string;
  serverSeed: string;
  clientSeed: string;
  nonce: string;
  results: string[];
  verificationUrl: string;
}

export interface ServerSeedDetailsLocked {
  __typename: string;
  serverSeedHash: string;
  activeGames: GameTypes[];
}

export type ServerSeedDetails =
  | ServerSeedDetailsOther
  | ServerSeedDetailsOwn
  | ServerSeedDetailsLocked;
