import React, { useState } from 'react';
import styles from '../../AffiliatesPage.module.scss';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../../../state';
import CopyField from '../../../../components/CopyField';
import { useUserState } from '../../../../user/UserProvider';

interface IProps {
  data?: any;
}

const Marketing: React.FC<IProps> = () => {
  const { t } = useTranslation(['affiliates']);
  const [{ sidebar }] = useStateValue();
  const [{ user }] = useUserState();
  // TODO: replace with useMemo
  const [link] = useState('https://staging.jinglebets.com/ref=' + user?.refCode);
  const [bundle_link] = useState('https://staging.jinglebets.com/cazzzino_marketing_bundle_1.zip');
  const [file_name] = useState('cazzzino_marketing_bundle_1.zip');

  return (
    <div>
      <div className={styles.marketing_title}>{t('marketing')}</div>
      <div className={styles.flex_marketing}>
        <div className={clsx(sidebar?.isOpen ? styles.grid21 : styles.grid21_close)}>
          <div />
          <div className={clsx(styles.bundles, styles.upper_txt)}>{t('download_bundles')}</div>
        </div>
        <div className={clsx(sidebar?.isOpen ? styles.grid21 : styles.grid21_close)}>
          <div>
            <CopyField className={styles.clipboard} label={t('referral_link')} value={link} />
          </div>
          <div className={styles.btn_download}>
            <div className={clsx(styles.download_url, styles.link_col)}>{file_name}</div>
            <a
              rel="noreferrer"
              target={'_blank'}
              href={bundle_link}
              className={styles.clipboard_btn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
