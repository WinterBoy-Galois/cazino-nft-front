import React, { useState } from 'react';
import styles from '../../AffiliatesPage.module.scss';
import BitcoinValue from '../../../../components/BitcoinValue/BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import clsx from 'clsx';
import { CLAIM_BONUS } from '../../../../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useStateValue } from '../../../../state/index';
import { useTranslation } from 'react-i18next';

interface IProps {
  bonusClaims?: any[];
}

interface IUnclaimedBonusProps {
  bonusClaim: any;
}

const UnClaimedBonus: React.FC<IUnclaimedBonusProps> = ({ bonusClaim }) => {
  const [claimBonus, { loading }] = useMutation(CLAIM_BONUS);
  const [, dispatch] = useStateValue();
  return (
    <>
      <div className={clsx(styles.unclaimed_bonus, styles.unclaimed_bonus__desktop)}>
        <div className={styles.unclaimed_bonus__summary}>
          <p>{bonusClaim.type} Bonus</p>
        </div>
      </div>
      <div className={clsx(styles.unclaimed_bonus, styles.unclaimed_bonus__mobile)}>
        <p className={styles.unclaimed_bonus__mobile__bonus_type}>{bonusClaim.type}</p>
      </div>
    </>
  );
};

const Stats: React.FC<IProps> = ({ bonusClaims: defaultBonusClaims = [] }) => {
  const [bonusClaims, setBonusClaims] = useState(defaultBonusClaims);
  const { t } = useTranslation(['transactions']);
  return (
    <div className={styles.unclaimed_bonuses}>
      <div className={styles.unclaimed_bonuses__title}>{t('stats').toUpperCase()}</div>
      {bonusClaims.slice(0, 3).map((bonusClaim, index) => (
        <UnClaimedBonus key={`unclaimed-bonus-${index}`} bonusClaim={bonusClaim} />
      ))}
    </div>
  );
};

export default Stats;
