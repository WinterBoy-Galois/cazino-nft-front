import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { error, info, success } from '../components/Toast';
import { BALANCE } from '../graphql/subscriptions';
import { TransactionStatus } from '../models/transactionStatus.model';
import { useStateValue } from '../state';

export default function useRealtimeBalance() {
  const { data } = useSubscription(BALANCE);
  const [, dispatch] = useStateValue();
  const { t } = useTranslation(['transactions']);

  useEffect(() => {
    if (data?.balance) {
      dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.balance.user.balance } });

      switch (data.balance.event) {
        case TransactionStatus.DEPOSIT_CONFIRMED:
          success(t('depositConfirmed', { amount: data.balance.amount }));
          break;

        case TransactionStatus.DEPOSIT_PENDING:
          info(t('depositPending', { amount: data.balance.amount }));
          break;

        case TransactionStatus.DEPOSIT_REJECTED:
          error(t('depositRejected', { amount: data.balance.amount }));
          break;
      }
    }
  }, [data, dispatch, t]);
}
