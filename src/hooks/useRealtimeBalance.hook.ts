import { useSubscription } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { error, info, success } from '../components/Toast';
import { DEPOSIT, WITHDRAW } from '../graphql/subscriptions';
import { TransactionStatus } from '../models/transactionStatus.model';
import { updateUserAction } from '../user/user.actions';
import { useUserState } from '../user/UserProvider';

export default function useRealtimeBalance() {
  const { data: depositData } = useSubscription(DEPOSIT);
  const { data: withdrawData } = useSubscription(WITHDRAW);

  const deposit = useMemo(() => depositData?.deposit, [depositData]);
  const withdraw = useMemo(() => withdrawData?.withdraw, [withdrawData]);

  const [, userDispatch] = useUserState();
  const { t } = useTranslation(['transactions']);

  useEffect(() => {
    if (deposit) {
      userDispatch(updateUserAction({ balance: deposit.user.balance }));

      switch (deposit.event) {
        case TransactionStatus.DEPOSIT_CONFIRMED:
          success(t('depositConfirmed', { amount: deposit.amount }));
          break;

        case TransactionStatus.DEPOSIT_PENDING:
          info(t('depositPending', { amount: deposit.amount }));
          break;

        case TransactionStatus.DEPOSIT_REJECTED:
          error(t('depositRejected', { amount: deposit.amount }));
          break;
      }
    }
  }, [deposit, userDispatch, t]);

  useEffect(() => {
    if (withdraw) {
      userDispatch(updateUserAction({ balance: withdraw.user.balance }));

      switch (withdraw.event) {
        case TransactionStatus.WITHDRAW_SUBMITTED:
          info(t('withdrawSubmitted', { amount: withdraw.amount }));
          break;
        case TransactionStatus.WITHDRAW_PENDING:
          info(t('withdrawPending', { amount: withdraw.amount }));
          break;

        case TransactionStatus.WITHDRAW_CONFIRMED:
          success(t('withdrawConfirmed', { amount: withdraw.amount }));
          break;

        case TransactionStatus.WITHDRAW_REJECTED:
          error(t('withdrawRejected', { amount: withdraw.amount }));
          break;
      }
    }
  }, [withdraw, userDispatch, t]);
}
