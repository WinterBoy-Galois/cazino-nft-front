import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GameTypes } from '../../models/gameTypes.model';
import { ServerSeedMe } from '../../models/serverSeedMe';
import { ButtonSize } from '../Button';
import CopyField from '../CopyField';
import SecondaryButton from '../SecondaryButton';
import TextInput from '../TextInput';
import styles from './ChangeServerSeed.module.scss';
import ActiveGame from './components';

export interface IProps {
  seeds: ServerSeedMe;
  activeGames: GameTypes[];
  onClickChangeSeed?: (clientSeed: string) => void;
  className?: string;
  loading?: boolean;
}

const ChangeServerSeed: React.FC<IProps> = ({
  className = '',
  seeds,
  activeGames,
  onClickChangeSeed = () => null,
}) => {
  const [clientSeed, setClientSeed] = useState(seeds.current.clientSeed);
  const { t } = useTranslation(['seeds']);

  const renderActiveGames = () => {
    return (
      <div className={`${styles.spacing2}`}>
        <h1 className={`${styles.title} ${styles.spacing}`}>{t('activeGames')}</h1>
        <div className="row">
          {activeGames.map((game, i) => (
            <div className="col-auto" key={i}>
              <ActiveGame game={game} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCurrent = () => {
    return (
      <div className={`${styles.container} h-100`}>
        <h1 className={styles.title}>{t('current')}</h1>
        <CopyField
          label={t('serverSeedHash')}
          value={seeds.current.serverSeedHash}
          className={`${styles.spacing} ${styles.textColor}`}
        />
        <TextInput label={t('clientSeed')} value={clientSeed} onChangeValue={setClientSeed} />
        <CopyField
          label={t('nonce')}
          value={`${seeds.current.nonce}`}
          className={`${styles.spacing} ${styles.textColor}`}
        />
        <div className={styles.button__container}>
          <SecondaryButton
            size={ButtonSize.SMALL}
            onClick={() => onClickChangeSeed(clientSeed)}
            disabled={clientSeed.trim().length === 0 || activeGames.length > 0}
          >
            {t('changeServerSeed')}
          </SecondaryButton>
          {activeGames.length > 0 && <div className={styles.error}>{t('endActiveGameError')}</div>}
        </div>
        {renderActiveGames()}
      </div>
    );
  };

  const renderPrevious = () => {
    return (
      <div className={`${styles.container} ${styles.marginTop1} h-100`}>
        <h1 className={styles.title}>{t('capital_previous')}</h1>
        <CopyField
          label={t('serverSeed')}
          value={seeds.previous.serverSeed}
          className={`${styles.spacing} ${styles.textColor}`}
        />
        <CopyField
          label={t('serverSeedHash')}
          value={seeds.previous.serverSeedHash}
          className={`${styles.spacing} ${styles.textColor}`}
        />
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      <div className="row">
        <div className="col-12 col-lg-6">{renderCurrent()}</div>
        <div className="col-12 col-lg-6">{renderPrevious()}</div>
      </div>
    </div>
  );
};

export default ChangeServerSeed;
