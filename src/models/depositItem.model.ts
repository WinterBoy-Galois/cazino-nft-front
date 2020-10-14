import { TransactionStatus } from './transactionStatus.model';

export interface DepositItem {
  status: TransactionStatus;
  time: number;
  hash: string;
  amount: number;
}
