import React, { Fragment } from 'react';
import styles from './LockedServerSeedDetails.module.scss';
import lock from '../../../../../../../../assets/images/misc/seed-locked.svg';
import CopyField from '../../../../../../../CopyField';
import SecondaryButton from '../../../../../../../SecondaryButton';
import { ButtonSize } from '../../../../../../../Button';
import { GameTypes } from '../../../../../../../../models/gameTypes.model';

interface IProps {
  activeGames: GameTypes[];
  serverSeedHash: string;
  onChangeServerSeed?: () => void;
}

const LockedServerSeedDetails: React.FC<IProps> = ({
  activeGames,
  serverSeedHash,
  onChangeServerSeed,
}) => {
  return (
    <Fragment>
      <div className={styles.notice}>
        <img src={lock} alt="Lock" className={styles.notice__lock} />
        <p className={styles.notice__text}>
          In order to see current server seed, new server seed must be generated.
        </p>
      </div>

      <div className={styles.hash}>
        <CopyField label={'Server seed hash'} value={serverSeedHash} />
      </div>

      <div className={styles.button__container}>
        <SecondaryButton
          size={ButtonSize.LARGE}
          onClick={onChangeServerSeed}
          disabled={activeGames?.length > 0}
        >
          change server seed
        </SecondaryButton>
        {activeGames?.length > 0 && (
          <div className={styles.error}>End active game(s) before changing server seed</div>
        )}
      </div>
    </Fragment>
  );
};

export default LockedServerSeedDetails;
