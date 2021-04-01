import { RouteComponentProps } from '@reach/router';
import React from 'react';
import TopBar from '../../components/Layout/components/TopBar';
import styles from './Page404.module.scss';
import notfoundIcon from '../../assets/images/errors/error-not-found.svg';
import { useTranslation } from 'react-i18next';

const Page404: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation(['error']);
  return (
    <div className="">
      <div className={styles.logo_container}>
        <TopBar isOnlyLeaveLogo />
      </div>
      <div className={styles.error_container}>
        <div className="row">
          <div className="col-12 col-md-auto" style={{ textAlign: 'center' }}>
            <img src={notfoundIcon} className={styles.icon} />
          </div>
          <div className={`${styles.label_container} col-12 col-md`}>
            <h2 className={styles.label1}>{t('notfoundTitle')}</h2>
            <h3 className={styles.label2}>{t('notfoundContent')}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
