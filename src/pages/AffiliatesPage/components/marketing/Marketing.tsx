import React, { useState } from 'react';
import styles from '../../AffiliatesPage.module.scss';
import BitcoinValue from '../../../../components/BitcoinValue/BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import clsx from 'clsx';
import { CLAIM_BONUS } from '../../../../graphql/mutations';
import { useMutation } from '@apollo/client';
import { success, error as errorToast } from '../../../../components/Toast';
import { useStateValue } from '../../../../state/index';
import { useTranslation } from 'react-i18next';

interface IProps {
  bonusClaims?: any[];
  onClaimBonus?: () => void;
}

interface IUnclaimedBonusProps {
  bonusClaim: any;
  onClaimBonusCompleted: (bonusId: string) => void;
}

const UnClaimedBonus: React.FC<IUnclaimedBonusProps> = ({
  bonusClaim,
  onClaimBonusCompleted = () => null,
}) => {
  const [claimBonus, { loading }] = useMutation(CLAIM_BONUS);
  const [, dispatch] = useStateValue();

  const onClaimBonus = async (bonusId: string) => {
    const { data, errors } = await claimBonus({ variables: { bonusId } });

    if (errors || data.claimBonus?.errors) {
      return errorToast("It's failed, please try again later.");
    }

    success(`Your balance has been updated: ${formatBitcoin(data.claimBonus.balance)}`);
    dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.claimBonus.balance } });

    onClaimBonusCompleted(bonusId);
  };

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

const Marketing: React.FC<IProps> = ({
  bonusClaims: defaultBonusClaims = [],
  onClaimBonus = () => null,
}) => {
  const [bonusClaims, setBonusClaims] = useState(defaultBonusClaims);
  const { t } = useTranslation(['transactions']);
  const onClaimBonusCompleted = (bonusId: string) => {
    setBonusClaims(
      ([] as any[]).concat(bonusClaims.filter(bonusClaim => bonusClaim.id !== bonusId))
    );
    onClaimBonus();
  };

  return (
    <div className={styles.unclaimed_bonuses}>
      <div className={styles.unclaimed_bonuses__title}>{t('marketing').toUpperCase()}</div>

      {bonusClaims.slice(0, 3).map((bonusClaim, index) => (
        <UnClaimedBonus
          key={`unclaimed-bonus-${index}`}
          bonusClaim={bonusClaim}
          onClaimBonusCompleted={onClaimBonusCompleted}
        />
      ))}
    </div>
  );
};

export default Marketing;
