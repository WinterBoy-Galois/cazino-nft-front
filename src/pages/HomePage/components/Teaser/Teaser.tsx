import React from 'react';
import styles from './Teaser.module.scss';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

const renderTeaser = (trans: string, t: TFunction) => (
  <div
    dangerouslySetInnerHTML={{
      __html: t(trans, {
        highlight: `<span class=${styles.highlight}>`,
        '/highlight': '</span>',
        interpolation: { escapeValue: false },
      }),
    }}
  />
);

const Teaser: React.SFC = () => {
  const { t } = useTranslation(['home']);

  return (
    <div className={styles.container}>
      <div className={`row`}>
        <div className={`col-12 col-md-6 ${styles.teaser}`}>
          <div className={styles.dot} />
          {renderTeaser('teaser.one', t)}
        </div>
        <div className={`col-12 col-md-6 ${styles.teaser}`}>
          <div className={styles.dot} />
          {renderTeaser('teaser.two', t)}
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-12 col-md-6 ${styles.teaser}`}>
          <div className={styles.dot} />
          {renderTeaser('teaser.three', t)}
        </div>
        <div className={`col-12 col-md-6 ${styles.teaser}`}>
          <div className={styles.dot} />
          {renderTeaser('teaser.four', t)}
        </div>
      </div>
    </div>
  );
};

export default Teaser;
