import React, { useMemo } from 'react';
import styles from '../../AffiliatesPage.module.scss';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import CopyField from '../../../../components/CopyField';
import { useUserState } from '../../../../user/UserProvider';

interface IProps {
  data?: any;
}

const Marketing: React.FC<IProps> = () => {
  const { t } = useTranslation(['affiliates']);
  const [{ user }] = useUserState();

  const link = useMemo(() => `https://staging.jinglebets.com/ref=${user?.refCode}`, [
    user?.refCode,
  ]);
  const bundle_link = 'https://staging.jinglebets.com/cazzzino_marketing_bundle_1.zip';
  const file_name = 'cazzzino_marketing_bundle_1.zip';

  return (
    <div>
      <div className={styles.marketing_title}>{t('marketing')}</div>
      <div className={styles.flex_marketing}>
        <div className={styles.new_grid}>
          <div className={styles.referal_container}>
            <CopyField className={styles.clipboard} label={t('referral_link')} value={link} />
          </div>
          <div className={styles.download_container}>
            <div className={clsx(styles.bundles, styles.upper_txt)}>{t('download_bundles')}</div>
            <div className={styles.btn_download}>
              <div className={clsx(styles.download_url, styles.link_col)}>{file_name}</div>
              {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
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
    </div>
  );
};

export default Marketing;
