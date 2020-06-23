import React, { Fragment } from 'react';
import styles from './LockedServerSeedDetails.module.scss';
import { ServerSeedDetailsLocked } from '../../../../../../models/serverSeedDetails.model';
import lock from '../../../../../../assets/images/misc/seed-locked.svg';
import CopyField from '../../../../../CopyField';

interface IProps {
  lockedDetails: ServerSeedDetailsLocked;
}

const LockedServerSeedDetails: React.FC<IProps> = ({ lockedDetails }) => {
  return (
    <Fragment>
      <div className={styles.notice}>
        <img src={lock} alt="Lock" className={styles.notice__lock} />
        <p className={styles.notice__text}>
          In order to see current server seed, new server seed must be generated.
        </p>
      </div>
      <div className={styles.hash}>
        <CopyField label={'Server seed hash'} value={lockedDetails.serverSeedHash} />
      </div>
    </Fragment>
  );
};

export default LockedServerSeedDetails;
