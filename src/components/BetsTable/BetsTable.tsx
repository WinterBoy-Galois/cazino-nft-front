import React from 'react';
import { useLocation, useNavigate } from '@reach/router';
import { datetimeFromEpoch } from '../../common/util/date.util';
import { formatBitcoin } from '../../common/util/format.util';
import TransactionsBet from '../../models/transactionsBet.model';
import BitcoinValue from '../BitcoinValue';
import TransactionsTable from '../TransactionsTable';
import { TableColumn } from '../TransactionsTable/lib/tableColumn';
import BitcoinProfit from '../BitcoinProfit';
import GameIcon from '../GameIcon';
import styles from './BetsTable.module.scss';
import { useTranslation } from 'react-i18next';
import { useUserState } from '../../user/UserProvider';
interface IProps {
  data: TransactionsBet[];
  paginationTotalRows?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  loading?: boolean;
}

const BetsTable: React.FC<IProps> = props => {
  const { t } = useTranslation(['transactions']);
  const columns: TableColumn<TransactionsBet>[] = [
    {
      selector: 'gameid',
      name: ' ',
      width: '36px',
      // eslint-disable-next-line
      cell: r => <GameIcon className={styles.icon} game={r.game} />,
    },
    {
      selector: 'time',
      name: t('bets.time').toUpperCase(),
      minWidth: '165px',
      format: r => datetimeFromEpoch(r.time),
    },
    {
      selector: 'id',
      name: t('bets.id').toUpperCase(),
      hideAtBreakpoint: 'md',
    },
    {
      selector: 'amount',
      name: t('bets.amount').toUpperCase(),
      hideAtBreakpoint: 'md',
      // eslint-disable-next-line
      cell: r => <BitcoinValue value={formatBitcoin(r.amount)} />,
    },
    {
      selector: 'profit',
      name: t('bets.profit').toUpperCase(),
      // eslint-disable-next-line
      cell: r => <BitcoinProfit value={r.profit} />,
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ user }] = useUserState();
  const handleRowClicked = (row: TransactionsBet) => {
    navigate(`${pathname}?dialog=bet-details`, {
      state: {
        bet: {
          ...row,
          userid: user?.id,
          username: user?.username,
          bet: row.amount,
          gameid: row.game,
        },
      },
    });
  };

  return (
    <TransactionsTable<TransactionsBet>
      {...props}
      columns={columns}
      progressPending={props.loading}
      onRowClicked={handleRowClicked}
    />
  );
};

export default BetsTable;
