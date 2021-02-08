import { TransactionStatus } from './transactionStatus.model';

export default interface TransactionsWithdraw {
  id: string;
  status: TransactionStatus;
  time: number;
  hash: string;
  address: string;
  amount: number;
  fee: number;
}
