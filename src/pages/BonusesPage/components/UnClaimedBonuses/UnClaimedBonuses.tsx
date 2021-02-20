import React, { useState } from 'react';
import { datetimeFromEpoch } from '../../../../common/util/date.util';
import BonusPosition from '../../../../components/icons/BonusPosition';
import styles from './UnClaimedBonuses.module.scss';
import BitcoinValue from '../../../../components/BitcoinValue/BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import SpinnerButton from '../../../../components/SpinnerButton';
import clsx from 'clsx';
import { CLAIM_BONUS } from '../../../../graphql/mutations';
import { useMutation } from '@apollo/client';
import { success, error as errorToast } from '../../../../components/Toast';
import { useStateValue } from '../../../../state/index';

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
        <div className={styles.unclaimed_bonus__position}>
          <BonusPosition position={bonusClaim.position} />
        </div>

        <div className={styles.unclaimed_bonus__summary}>
          <p>{datetimeFromEpoch(bonusClaim.givenAt)}</p>
          <p>{bonusClaim.type} Bonus</p>
          <p>Expires on {datetimeFromEpoch(bonusClaim.expiresAt)}</p>
        </div>

        <SpinnerButton
          onClick={() => onClaimBonus(bonusClaim.id)}
          loading={loading}
          className={styles.unclaimed_bonus__button}
        >
          <span>CLAIM MY BONUS!</span>
          <BitcoinValue
            className={styles.unclaimed_bonus__button__icon}
            value={formatBitcoin(bonusClaim.amount)}
          />
        </SpinnerButton>
      </div>

      <div className={clsx(styles.unclaimed_bonus, styles.unclaimed_bonus__mobile)}>
        <p className={styles.unclaimed_bonus__mobile__bonus_type}>{bonusClaim.type}</p>

        <div className={styles.unclaimed_bonus__mobile__pos_button}>
          <div className={styles.unclaimed_bonus__position}>
            <BonusPosition position={bonusClaim.position} />
          </div>

          <SpinnerButton className={styles.unclaimed_bonus__button}>
            <span>CLAIM</span>
            <BitcoinValue
              className={styles.unclaimed_bonus__button__icon}
              value={formatBitcoin(bonusClaim.amount)}
            />
          </SpinnerButton>
        </div>

        <div className={styles.unclaimed_bonus__mobile__summary}>
          <p>Received on {datetimeFromEpoch(bonusClaim.givenAt)}</p>
          <p>Expires on {datetimeFromEpoch(bonusClaim.expiresAt)}</p>
        </div>
      </div>
    </>
  );
};

const UnClaimedBonuses: React.FC<IProps> = ({
  bonusClaims: defaultBonusClaims = [],
  onClaimBonus = () => null,
}) => {
  const [bonusClaims, setBonusClaims] = useState(defaultBonusClaims);

  const onClaimBonusCompleted = (bonusId: string) => {
    setBonusClaims(
      ([] as any[]).concat(bonusClaims.filter(bonusClaim => bonusClaim.id !== bonusId))
    );

    onClaimBonus();
  };

  return (
    <div className={styles.unclaimed_bonuses}>
      <div className={styles.unclaimed_bonuses__title}>UNCLAIMED BONUSES</div>

      {bonusClaims.slice(0, 3).map((bonusClaim, index) => (
        <UnClaimedBonus
          key={`unclaimed-bonus-${index}`}
          bonusClaim={bonusClaim}
          onClaimBonusCompleted={onClaimBonusCompleted}
        />
      ))}

      <div className={styles.unclaimed_bonuses__history}>
        <a href="/transactions/bonuses" className={styles.unclaimed_bonuses__history__link}>
          HISTORY OF BONUS TRANSFERS
        </a>
      </div>
    </div>
  );
};

export default UnClaimedBonuses;
