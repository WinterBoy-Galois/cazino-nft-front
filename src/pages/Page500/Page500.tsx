import { RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import TopBar from '../../components/Layout/components/TopBar';
import styles from './Page500.module.scss';
import errorServerIcon from '../../assets/images/errors/error-server.svg';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../state';

const Page500: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation(['error']);
  const [, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({ type: 'CHAT_BOT_SHOW', payload: false });
  }, []);

  return (
    <div className="">
      <div className={styles.logo_container}>
        <TopBar isOnlyLeaveLogo />
      </div>
      <div className={styles.error_container}>
        <div className="row">
          <div className="col-12 col-md-auto" style={{ textAlign: 'center' }}>
            <img src={errorServerIcon} className={styles.icon} alt={'Error Server Icon'} />
          </div>
          <div className={`${styles.label_container} col-12 col-md`}>
            <h2 className={styles.label1}>{t('serverErrorTitle')}</h2>
            <span className={styles.label2}>{t('serverErrorContent1')}</span>
            <span className={styles.label2}>{t('serverErrorContent2')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page500;
