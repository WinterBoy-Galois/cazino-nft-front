import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { LEADERBOARDS, BONUSCLAIMS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { LEADERBOARDS_SUBSCRIPTION } from '../../graphql/subscriptions';
import { useLocation, useNavigate } from '@reach/router';
import styles from './AffiliatesPage.module.scss';

import Commissions from './components/commissions';
import Marketing from './components/marketing';
import Stats from './components/stats';
import { useTranslation } from 'react-i18next';

const AffiliatesPage: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation(['transactions']);
  const { loading, error, data, subscribeToMore } = useQuery(LEADERBOARDS);
  const { data: __bonusClaims, refetch: refreshBonusClaims } = useQuery(BONUSCLAIMS);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onTransferBalance = (d: string) => {
    console.log(d);
  };
  const onCopyLink = (d: string) => {
    console.log(d);
  };

  return (
    <div className={styles.affiliates_page}>
      <div className={styles.bonuses_title}>{t('affiliate').toUpperCase()}</div>
      <div className={styles.container}>
        <div className={styles.grid2}>
          <div className={styles.card_bg}>
            <Commissions bonusClaims={[]} onClaimBonus={() => onTransferBalance} />
          </div>
          <div className={styles.card_bg}>
            <Stats bonusClaims={[]} />
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
