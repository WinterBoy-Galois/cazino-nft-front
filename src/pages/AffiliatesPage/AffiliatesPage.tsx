import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { ME, AFF_STATS } from '../../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { CLAIM_COMMISSION } from '../../graphql/mutations';
import styles from './AffiliatesPage.module.scss';
import Commissions from './components/commissions';
import Marketing from './components/marketing';
import Stats from './components/stats';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../state';
import clsx from 'clsx';

const AffiliatesPage: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation(['transactions']);
  const [{ sidebar }] = useStateValue();
  const { data: dataMe } = useQuery(ME);
  const { data: dataStats } = useQuery(AFF_STATS);
  const [claimCommissions, { loading: loadingSetup }] = useMutation(CLAIM_COMMISSION);
  const [{ auth }, dispatch] = useStateValue();
  const [commissionData, setCommissionData] = useState(dataMe?.me);
  const onTransferBalance = async () => {
    const { data, errors } = await claimCommissions();
    await setCommissionData(data?.claimCommissions);
    if (!errors && data && auth.state === 'SIGNED_IN') {
      dispatch({
        type: 'AUTH_SIGN_IN',
        payload: { user: { ...data?.claimCommissions } },
      });
    }
  };

  return (
    <div className={styles.affiliates_page}>
      <div className={styles.bonuses_title}>{t('affiliate').toUpperCase()}</div>
      <div className={clsx(sidebar?.isOpen ? styles.container : styles.container_close)}>
        <div className={clsx(sidebar?.isOpen ? styles.grid2 : styles.grid2_close)}>
          <div className={clsx(sidebar?.isOpen ? styles.card_bg : styles.card_bg_close)}>
            <Commissions
              loadingSetup={loadingSetup}
              data={commissionData}
              onTransferBalance={onTransferBalance}
            />
          </div>
          <div className={styles.card_bg}>
            <Stats data={dataStats?.affStats} />
          </div>
        </div>
        <div className={styles.card_bg}>
          <Marketing />
        </div>
      </div>
    </div>
  );
};

export default AffiliatesPage;
