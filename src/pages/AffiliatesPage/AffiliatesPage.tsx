import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { ME, AFF_STATS } from '../../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { CLAIM_COMMISSION } from '../../graphql/mutations';
import { useLocation, useNavigate } from '@reach/router';
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
  const { loading, error, data: dataMe } = useQuery(ME);
  const { loading: loadingStats, error: errorStats, data: dataStats } = useQuery(AFF_STATS);
  const [claimCommissions] = useMutation(CLAIM_COMMISSION);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onCopyLink = (d: string) => {
    console.log(d);
  };
  const onTransferBalance = async () => {
    const { data, errors } = await claimCommissions();
    console.log(data, ' ======== claim commissions mutation ');
  };
  useEffect(() => {
    onTransferBalance();
  }, []);

  return (
    <div className={styles.affiliates_page}>
      <div className={styles.bonuses_title}>{t('affiliate').toUpperCase()}</div>
      <div className={clsx(sidebar?.isOpen ? styles.container : styles.container_close)}>
        <div className={clsx(sidebar?.isOpen ? styles.grid2 : styles.grid2_close)}>
          <div className={clsx(sidebar?.isOpen ? styles.card_bg : styles.card_bg_close)}>
            <Commissions data={dataMe?.me} onTransferBalance={() => onTransferBalance} />
          </div>
          <div className={styles.card_bg}>
            <Stats data={dataStats?.affStats} />
          </div>
        </div>
        <div className={styles.card_bg}>
          <Marketing bonusClaims={[]} onClaimBonus={() => onCopyLink} />
        </div>
      </div>
    </div>
  );
};

export default AffiliatesPage;
