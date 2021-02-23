import React from 'react';
import { useLocation, useNavigate } from '@reach/router';
import { datetimeFromEpoch } from '../../common/util/date.util';
import { formatBitcoin } from '../../common/util/format.util';
import TransactionsBonus from '../../models/transactionsBonus.model';
import BitcoinValue from '../BitcoinValue';
import TransactionsTable from '../TransactionsTable';
import { TableColumn } from '../TransactionsTable/lib/tableColumn';
import styles from './BonusesTable.module.scss';

interface IProps {
  data: TransactionsBonus[];
  paginationTotalRows?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  loading?: boolean;
}

const BonusesTable: React.FC<IProps> = props => {
  const columns: TableColumn<TransactionsBonus>[] = [
    {
      selector: 'time',
      name: 'Time',
      minWidth: '165px',
      format: r => datetimeFromEpoch(r.givenAt),
    },
    {
      selector: 'position',
      name: 'Pos',
      maxWidth: '80px',
      minWidth: '80px',
      // eslint-disable-next-line
      cell: r => <span className={styles.position}>{r.position}</span>,
    },
    {
      selector: 'type',
      name: 'Type',
      minWidth: '165px',
      hideAtBreakpoint: 'xl',
      format: r => r.type,
    },
    {
      selector: 'wager',
      name: 'Wager',
      minWidth: '165px',
      hideAtBreakpoint: 'xl',
      // eslint-disable-next-line
      cell: r => <BitcoinValue value={formatBitcoin(r.wager)} />,
    },
    {
      selector: 'bonus',
      name: 'Bonus',
      minWidth: '165px',
      // eslint-disable-next-line
      cell: r => <BitcoinValue value={formatBitcoin(r.amount)} />,
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleRowClicked = (row: TransactionsBonus) => {
    navigate(`${pathname}?dialog=bonus-details`, {
      state: {
        givenAt: datetimeFromEpoch(row.givenAt),
        type: row.type,
        wager: row.wager,
        amount: row.amount,
      },
    });
  };

  return (
    <TransactionsTable<TransactionsBonus>
      {...props}
      columns={columns}
      progressPending={props.loading}
      onRowClicked={handleRowClicked}
    />
  );
};

export default BonusesTable;
