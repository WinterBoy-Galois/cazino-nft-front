import React from 'react';
import { ServerSeedDetailsOwn } from '../../../../../../models/serverSeedDetails.model';
import UnlockedServerSeedDetails from './components/UnlockedServerSeedDetails';
import LockedServerSeedDetails from './components/LockedServerSeedDetails';

interface IProps {
  ownDetails: ServerSeedDetailsOwn;
  onChangeServerSeed?: () => void;
}

const OwnServerSeedDetails: React.FC<IProps> = ({ ownDetails, onChangeServerSeed }) => {
  const { serverSeed, clientSeed, nonce, results, verificationUrl, activeGames } = ownDetails;

  return serverSeed &&
    clientSeed &&
    nonce !== null &&
    results &&
    verificationUrl &&
    (!activeGames || activeGames.length <= 0) ? (
    <UnlockedServerSeedDetails ownDetails={ownDetails} />
  ) : (
    <LockedServerSeedDetails
      activeGames={ownDetails.activeGames}
      serverSeedHash={ownDetails.serverSeedHash}
      onChangeServerSeed={onChangeServerSeed}
    />
  );
};

export default OwnServerSeedDetails;
