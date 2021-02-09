import React from 'react';
import { useLocation, useNavigate } from '@reach/router';
import { datetimeFromEpoch } from '../../common/util/date.util';
import { formatBitcoin } from '../../common/util/format.util';
import TransactionsWithdraw from '../../models/transactionsWithdraw.model';
import BitcoinValue from '../BitcoinValue';
import TransactionsTable from '../TransactionsTable';
import { TableColumn } from '../TransactionsTable/lib/tableColumn';
import BitcoinProfit from '../BitcoinProfit';
import GameIcon from '../GameIcon';
import styles from './WithdrawalsTable.module.scss';
import { useStateValue } from '../../state';
import clsx from 'clsx';

interface IProps {
  data: TransactionsWithdraw[];
  paginationTotalRows?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  loading?: boolean;
}

const WithdrawalsTable: React.FC<IProps> = props => {
  const getStatusClassName = (status: string) => {
    if (status === 'WITHDRAW_PENDING') return styles.withdrawal__status__yellow;

    if (status === 'WITHDRAW_CONFIRMED') return styles.withdrawal__status__green;

    if (status === 'WITHDRAW_REJECTED') return styles.withdrawal__status__red;

    return styles.withdrawal__status__unknown;
  };

  const columns: TableColumn<TransactionsWithdraw>[] = [
    {
      selector: 'status',
      name: ' ',
      width: '36px',
      // eslint-disable-next-line
      cell: r => (
        <span className={clsx(styles.withdrawal__status, getStatusClassName(r.status))}>
          &nbsp;
        </span>
      ),
    },
    {
      selector: 'time',
      name: 'Time',
      minWidth: '165px',
      format: r => datetimeFromEpoch(r.time),
    },
    {
      selector: 'address',
      name: 'Address',
      hideAtBreakpoint: 'md',
      // eslint-disable-next-line
      format: r => r.address,
    },
    {
      selector: 'amount',
      name: 'Amount',
      maxWidth: '150px',
      // eslint-disable-next-line
      cell: r => <BitcoinValue value={formatBitcoin(r.amount)} />,
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ auth }] = useStateValue();
  const handleRowClicked = (row: TransactionsWithdraw) => {
    navigate(`${pathname}?dialog=withdrawal-details`, {
      state: {
        address: row.address,
        amount: row.amount,
        status: row.status,
        time: datetimeFromEpoch(row.time),
      },
    });
  };

  return (
    <TransactionsTable<TransactionsWithdraw>
      {...props}
      columns={columns}
      progressPending={props.loading}
      onRowClicked={handleRowClicked}
    />
  );
};

export default WithdrawalsTable;
