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
      const position = data.bonusReceived.position;
      let position_string;
      switch (position) {
        case 1:
          position_string = '1st';
          break;
        case 2:
          position_string = '2nd';
          break;
        case 3:
          position_string = '3rd';
          break;

        default:
          position_string = position.toString() + 'th';
          break;
      }

      const type_temp = 'notificationEnum.' + data.bonusReceived.type;

      success(
        t('bonusNotification', {
          amount: data.bonusReceived.amount,
          type: t(type_temp),
          position: position_string,
        })
      );
    }
  }, [data, dispatch, t]);
}
