import React from 'react';
import { datetimeFromEpoch } from '../../common/util/date.util';
import { formatBitcoin } from '../../common/util/format.util';
import { DepositItem } from '../../models/depositItem.model';
import BitcoinValue from '../BitcoinValue';
import ExternalLink from '../ExternalLink';
import TransactionsTable from '../TransactionsTable';
import { TableColumn } from '../TransactionsTable/lib/tableColumn';
import TransactionStatus from './components/TransactionStatus';
// import styles from './DepositsTable.module.scss';

interface IProps {
  data: DepositItem[];
  paginationTotalRows?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  loading?: boolean;
}

const DepositsTable: React.FC<IProps> = props => {
  const columns: TableColumn<DepositItem>[] = [
    {
      selector: 'status',
      name: ' ',
      width: '36px',
      // eslint-disable-next-line
      cell: r => <TransactionStatus status={r.status} />,
    },
    {
      selector: 'time',
      name: 'Date/Time',
      maxWidth: '180px',
      format: r => datetimeFromEpoch(r.time),
    },
    {
      selector: 'hash',
      name: 'Hash',
      grow: 1,
      hideAtBreakpoint: 'md',
      // eslint-disable-next-line
      cell: r => (
        <ExternalLink href={`https://live.blockcypher.com/btc/tx/${r.hash}`}>{r.hash}</ExternalLink>
      ),
    },
    {
      selector: 'amount',
      name: 'Amount',
      maxWidth: '120px',
      // eslint-disable-next-line
      cell: r => <BitcoinValue value={formatBitcoin(r.amount)} />,
    },
  ];

  return <TransactionsTable {...props} columns={columns} progressPending={props.loading} />;
};

export default DepositsTable;
