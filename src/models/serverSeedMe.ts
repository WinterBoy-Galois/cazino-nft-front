export interface SeedCurrent {
  serverSeedHash: string;
  clientSeed: string;
  nonce: number;
}

export interface SeedPrevious {
  serverSeed: string;
  serverSeedHash: string;
}

export interface ServerSeedMe {
  current: SeedCurrent;
  previous: SeedPrevious;
}
