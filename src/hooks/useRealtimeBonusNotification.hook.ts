import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { success } from '../components/Toast';
import { BONUS_NOTIFICATION } from '../graphql/subscriptions';
import { useStateValue } from '../state';

import useSound from 'use-sound';
import { bonus_received_v1 } from '../components/App/App';

export default function useRealtimeBonusNotification() {
  const { data } = useSubscription(BONUS_NOTIFICATION);
  const [, dispatch] = useStateValue();
  const { t } = useTranslation(['transactions']);
  const [playBonusReceived] = useSound(bonus_received_v1.default);

  const [{ auth }] = useStateValue();
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  useEffect(() => {
    if (
      data?.bonusReceived &&
      auth?.state === 'SIGNED_IN' &&
      data?.bonusReceived.userid === auth?.user?.id
    ) {
      if (isSound) {
        (async () => {
          await playBonusReceived();
        })();
      }
      dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.bonusReceived.balance } });

      success(t('bonusNotification'));
    }
  }, [data, dispatch, t]);
}
