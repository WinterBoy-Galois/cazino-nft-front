import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { error, info, success } from '../components/Toast';
import { BALANCE } from '../graphql/subscriptions';
import { TransactionStatus } from '../models/transactionStatus.model';
import { updateUserAction } from '../user/user.actions';
import { useUserState } from '../user/UserProvider';

export default function useRealtimeBalance() {
  const { data } = useSubscription(BALANCE);
  const [, userDispatch] = useUserState();
  const { t } = useTranslation(['transactions']);

  useEffect(() => {
    if (data?.balance) {
      userDispatch(updateUserAction({ balance: data.balance.user.balance }));

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

        case TransactionStatus.WITHDRAW_PENDING:
          info(t('withdrawPending'));
          break;

        case TransactionStatus.WITHDRAW_CONFIRMED:
          success(t('withdrawConfirmed'));
          break;

        case TransactionStatus.WITHDRAW_REJECTED:
          error(t('withdrawRejected'));
          break;
      }
    }
  }, [data, userDispatch, t]);
}
