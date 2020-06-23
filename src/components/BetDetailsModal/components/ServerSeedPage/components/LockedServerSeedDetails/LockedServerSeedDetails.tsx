import React, { Fragment } from 'react';
import styles from './LockedServerSeedDetails.module.scss';
import { ServerSeedDetailsLocked } from '../../../../../../models/serverSeedDetails.model';
import lock from '../../../../../../assets/images/misc/seed-locked.svg';
import CopyField from '../../../../../CopyField';
import SecondaryButton from '../../../../../SecondaryButton';
import { ButtonSize } from '../../../../../Button';

interface IProps {
  lockedDetails: ServerSeedDetailsLocked;
  onChangeServerSeed?: () => void;
}

const LockedServerSeedDetails: React.FC<IProps> = ({ lockedDetails, onChangeServerSeed }) => {
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

      <div className={styles.button__container}>
        <SecondaryButton size={ButtonSize.LARGE} onClick={onChangeServerSeed}>
          change server seed
        </SecondaryButton>
      </div>
    </Fragment>
  );
};

export default LockedServerSeedDetails;
