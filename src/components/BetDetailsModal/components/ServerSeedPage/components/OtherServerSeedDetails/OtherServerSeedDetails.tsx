import React from 'react';
import styles from './OtherServerSeedDetails.module.scss';
import { ServerSeedDetailsOther } from '../../../../../../models/serverSeedDetails.model';

interface IProps {
  otherDetails: ServerSeedDetailsOther;
}

const OtherServerSeedDetails: React.FC<IProps> = () => {
  return <div>Other ServerSeed</div>;
};

export default OtherServerSeedDetails;
