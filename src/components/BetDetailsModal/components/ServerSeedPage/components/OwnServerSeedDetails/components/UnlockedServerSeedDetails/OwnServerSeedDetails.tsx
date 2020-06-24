import React, { Fragment } from 'react';
import styles from './UnlockedServerSeedDetails.module.scss';
import { ServerSeedDetailsOwn } from '../../../../../../../../models/serverSeedDetails.model';
import CopyField from '../../../../../../../CopyField';

interface IProps {
  ownDetails: ServerSeedDetailsOwn;
}

const UnlockedServerSeedDetails: React.FC<IProps> = ({ ownDetails }) => {
  return (
    <Fragment>
      <CopyField label={'Server seed hash'} value={ownDetails.serverSeedHash} />
    </Fragment>
  );
};

export default UnlockedServerSeedDetails;
