import { RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import TopBar from '../../components/Layout/components/TopBar';
import styles from './Page404.module.scss';
import notfoundIcon from '../../assets/images/errors/error-not-found.svg';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../state';

const Page404: React.FC<RouteComponentProps & { raw?: boolean }> = ({ raw }) => {
  const { t } = useTranslation(['error']);
  const [, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({ type: 'CHAT_BOT_SHOW', payload: false });
  }, []);

  return (
    <div className="">
      {!raw && (
        <div className={styles.logo_container}>
          <TopBar isOnlyLeaveLogo />
        </div>
      )}
      <div className={styles.error_container}>
        <div className="row">
          <div className="col-12 col-md-auto" style={{ textAlign: 'center' }}>
            <img src={notfoundIcon} className={styles.icon} alt={'Not Found Icon'} />
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
