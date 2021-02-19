import React from 'react';
import { useLocation, useNavigate } from '@reach/router';
import { datetimeFromEpoch } from '../../common/util/date.util';
import { formatBitcoin } from '../../common/util/format.util';
import TransactionsBonus from '../../models/transactionsBonus.model';
import BitcoinValue from '../BitcoinValue';
import TransactionsTable from '../TransactionsTable';
import { TableColumn } from '../TransactionsTable/lib/tableColumn';
import styles from './BonusesTable.module.scss';
import { useStateValue } from '../../state';

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
      selector: 'claimedAt',
      name: 'Claimed At',
      minWidth: '165px',
      hideAtBreakpoint: 'xl',
      format: r => datetimeFromEpoch(r.claimedAt),
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
      maxWidth: '165px',
      hideAtBreakpoint: 'xl',
      format: r => r.type,
    },
    {
      selector: 'wager',
      name: 'Wager',
      maxWidth: '165px',
      hideAtBreakpoint: 'xl',
      // eslint-disable-next-line
      cell: r => <BitcoinValue value={formatBitcoin(r.wager)} />,
    },
    {
      selector: 'bonus',
      name: 'Bonus',
      maxWidth: '165px',
      // eslint-disable-next-line
      cell: r => <BitcoinValue value={formatBitcoin(r.amount)} />,
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ auth }] = useStateValue();
  const handleRowClicked = (row: TransactionsBonus) => {
    navigate(`${pathname}?dialog=withdrawal-details`, {
      state: {
        // address: row.address,
        // amount: row.amount,
        // status: row.status,
        // time: datetimeFromEpoch(row.time),
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
