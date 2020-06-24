import React, { Fragment } from 'react';
import styles from './UnlockedServerSeedDetails.module.scss';
import { ServerSeedDetailsOwn } from '../../../../../../../../models/serverSeedDetails.model';
import CopyField from '../../../../../../../CopyField';
import Link from '../../../../../../../Link';
import { useTranslation } from 'react-i18next';

interface IProps {
  ownDetails: ServerSeedDetailsOwn;
}

const UnlockedServerSeedDetails: React.FC<IProps> = ({ ownDetails }) => {
  const { t } = useTranslation(['modals']);

  return (
    <Fragment>
      <CopyField
        className={styles.field}
        label={t('serverSeed.serverSeedHash')}
        value={ownDetails.serverSeedHash}
      />
      <CopyField
        className={styles.field}
        label={t('serverSeed.serverSeed')}
        value={ownDetails.serverSeed}
      />
      <CopyField
        className={styles.field}
        label={t('serverSeed.clientSeed')}
        value={ownDetails.clientSeed}
      />
      <CopyField className={styles.field} label={t('serverSeed.nonce')} value={ownDetails.nonce} />

      <h2 className={styles.headline}>{t('serverSeed.result')}</h2>
      <ul className={styles['results-list']}>
        {ownDetails.results.map((r, i) => (
          <li key={`${r}_${i}`} className={styles['results-list__item']}>
            <div className={styles.result}>
              <span className={styles.result__dot} />
              <span className={styles.result__value}>{r}</span>
            </div>
          </li>
        ))}
      </ul>

      <h2 className={styles.headline}>{t('serverSeed.thirdPartyVerfication')}</h2>
      <p className={styles.text}>{t('serverSeed.verificationText')}</p>

      <Link className={styles.link} href={ownDetails.verificationUrl} target="_blank">
        {t('serverSeed.verificationLinkText')}
      </Link>
    </Fragment>
  );
};

export default UnlockedServerSeedDetails;
