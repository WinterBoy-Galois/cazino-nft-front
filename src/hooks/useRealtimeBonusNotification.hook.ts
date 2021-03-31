import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { success } from '../components/Toast';
import { BONUS_NOTIFICATION } from '../graphql/subscriptions';
import { useStateValue } from '../state';

export default function useRealtimeBonusNotification() {
  const { data } = useSubscription(BONUS_NOTIFICATION);
  const [, dispatch] = useStateValue();
  const { t } = useTranslation(['transactions']);

  useEffect(() => {
    if (data?.bonusReceived) {
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
