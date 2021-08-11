import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { success } from '../components/Toast';
import { BONUS_NOTIFICATION } from '../graphql/subscriptions';
import { useStateValue } from '../state';

import useSound from 'use-sound';
import { bonus_received_v1 } from '../components/App/App';
import { useIsAuthorized } from './useIsAuthorized';
import { updateUserAction } from '../user/user.actions';
import { useUserState } from '../user/UserProvider';

export default function useRealtimeBonusNotification() {
  const isAuthorized = useIsAuthorized();
  const { data } = useSubscription(BONUS_NOTIFICATION);
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();
  const { t } = useTranslation(['transactions']);
  const [playBonusReceived] = useSound(bonus_received_v1.default);

  const [{ user }, userDispatch] = useUserState();

  useEffect(() => {
    if (data?.bonusReceived && isAuthorized && data?.bonusReceived.userid === user?.id) {
      if (isSound) {
        (async () => {
          await playBonusReceived();
        })();
      }
      userDispatch(updateUserAction({ balance: data.bonusReceived.amount }));

      success(t('bonusNotification'));
    }
  }, [data, t, isAuthorized]);
}
