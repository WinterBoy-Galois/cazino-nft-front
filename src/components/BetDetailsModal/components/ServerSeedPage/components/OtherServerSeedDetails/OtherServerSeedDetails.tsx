import React from 'react';
import styles from './OtherServerSeedDetails.module.scss';
import { ServerSeedDetailsOther } from '../../../../../../models/serverSeedDetails.model';
import CopyField from '../../../../../CopyField';

interface IProps {
  otherDetails: ServerSeedDetailsOther;
}

const OtherServerSeedDetails: React.FC<IProps> = ({ otherDetails }) => {
  return (
    <div className={styles.container}>
      <CopyField label={'Server seed hash'} value={otherDetails.serverSeedHash} />
    </div>
  );
};

export default OtherServerSeedDetails;
