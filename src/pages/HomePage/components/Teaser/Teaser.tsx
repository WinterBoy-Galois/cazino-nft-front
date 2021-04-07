import React from 'react';
import styles from './Teaser.module.scss';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { useStateValue } from '../../../../state';

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

const Teaser: React.FC = () => {
  const { t } = useTranslation(['home']);
  const [
    {
      sidebar: { isOpen },
    },
  ] = useStateValue();

  return (
    <div className={styles.container}>
      <div className={`row`}>
        <div className={`col-12 ${isOpen ? styles.openMenu : 'col-md-6'} ${styles.teaser}`}>
          <div className={`${styles.dot} ${isOpen ? styles.openMenu : ''}`} />
          {renderTeaser('teaser.one', t)}
        </div>
        <div className={`col-12 ${isOpen ? styles.openMenu : 'col-md-6'} ${styles.teaser}`}>
          <div className={`${styles.dot} ${isOpen ? styles.openMenu : ''}`} />
          {renderTeaser('teaser.two', t)}
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-12 ${isOpen ? styles.openMenu : 'col-md-6'} ${styles.teaser}`}>
          <div className={`${styles.dot} ${isOpen ? styles.openMenu : ''}`} />
          {renderTeaser('teaser.three', t)}
        </div>
        <div className={`col-12 ${isOpen ? styles.openMenu : 'col-md-6'} ${styles.teaser}`}>
          <div className={`${styles.dot} ${isOpen ? styles.openMenu : ''}`} />
          {renderTeaser('teaser.four', t)}
        </div>
      </div>
    </div>
  );
};

export default Teaser;
