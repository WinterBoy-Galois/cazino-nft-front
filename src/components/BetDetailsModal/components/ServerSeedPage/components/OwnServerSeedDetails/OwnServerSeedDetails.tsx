import React, { Fragment } from 'react';
import styles from './OwnServerSeedDetails.module.scss';
import lock from '../../../../../../assets/images/misc/seed-locked.svg';
import CopyField from '../../../../../CopyField';
import SecondaryButton from '../../../../../SecondaryButton';
import { ButtonSize } from '../../../../../Button';
import { ServerSeedDetailsOwn } from '../../../../../../models/serverSeedDetails.model';

interface IProps {
  ownDetails: ServerSeedDetailsOwn;
  onChangeServerSeed?: () => void;
}

const OwnServerSeedDetails: React.FC<IProps> = ({ ownDetails, onChangeServerSeed }) => {
  return (
    <Fragment>
      <div className={styles.notice}>
        <img src={lock} alt="Lock" className={styles.notice__lock} />
        <p className={styles.notice__text}>
          In order to see current server seed, new server seed must be generated.
        </p>
      </div>

      <div className={styles.hash}>
        <CopyField label={'Server seed hash'} value={ownDetails.serverSeedHash} />
      </div>

      <div className={styles.button__container}>
        <SecondaryButton
          size={ButtonSize.LARGE}
          onClick={onChangeServerSeed}
          disabled={ownDetails.activeGames?.length > 0}
        >
          change server seed
        </SecondaryButton>
        {ownDetails.activeGames?.length > 0 && (
          <div className={styles.error}>End active game(s) before changing server seed</div>
        )}
      </div>
    </Fragment>
  );
};

export default OwnServerSeedDetails;
