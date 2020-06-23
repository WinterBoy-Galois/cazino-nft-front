import React from 'react';
import styles from './OwnServerSeedDetails.module.scss';
import { ServerSeedDetailsOwn } from '../../../../../../models/serverSeedDetails.model';

interface IProps {
  ownDetails: ServerSeedDetailsOwn;
}

const OwnServerSeedDetails: React.FC<IProps> = () => {
  return <div>Own ServerSeed</div>;
};

export default OwnServerSeedDetails;
