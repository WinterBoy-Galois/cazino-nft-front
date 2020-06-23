import React from 'react';
import styles from './LockedServerSeedDetails.module.scss';
import { ServerSeedDetailsLocked } from '../../../../../../models/serverSeedDetails.model';

interface IProps {
  lockedDetails: ServerSeedDetailsLocked;
}

const LockedServerSeedDetails: React.FC<IProps> = () => {
  return <div>Locked ServerSeed</div>;
};

export default LockedServerSeedDetails;
