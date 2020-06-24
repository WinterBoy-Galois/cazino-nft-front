import React, { Fragment } from 'react';
import styles from './LockedServerSeedDetails.module.scss';
import lock from '../../../../../../../../assets/images/misc/seed-locked.svg';
import CopyField from '../../../../../../../CopyField';
import SecondaryButton from '../../../../../../../SecondaryButton';
import { ButtonSize } from '../../../../../../../Button';
import { GameTypes } from '../../../../../../../../models/gameTypes.model';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['modals']);

  return (
    <Fragment>
      <div className={styles.notice}>
        <img src={lock} alt="Lock" className={styles.notice__lock} />
        <p className={styles.notice__text}>{t('serverSeed.lockedNotice')}</p>
      </div>

      <div className={styles.hash}>
        <CopyField label={t('serverSeed.serverSeedHash')} value={serverSeedHash} />
      </div>

      <div className={styles.button__container}>
        <SecondaryButton
          size={ButtonSize.LARGE}
          onClick={onChangeServerSeed}
          disabled={activeGames?.length > 0}
        >
          {t('serverSeed.changeServerSeed')}
        </SecondaryButton>
        {activeGames?.length > 0 && (
          <div className={styles.error}>{t('serverSeed.activeGameError')}</div>
        )}
      </div>
    </Fragment>
  );
};

export default LockedServerSeedDetails;
