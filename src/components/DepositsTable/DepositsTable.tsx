import { useLocation, useNavigate } from '@reach/router';
import React from 'react';
import { appConfig } from '../../common/config';
import { datetimeFromEpoch } from '../../common/util/date.util';
import { formatBitcoin } from '../../common/util/format.util';
import { DepositItem } from '../../models/depositItem.model';
import BitcoinValue from '../BitcoinValue';
import ExternalLink from '../ExternalLink';
import TransactionsTable from '../TransactionsTable';
import { TableColumn } from '../TransactionsTable/lib/tableColumn';
import TransactionStatus from '../TransactionStatus';
import { useTranslation } from 'react-i18next';

interface IProps {
  data: DepositItem[];
  paginationTotalRows?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  loading?: boolean;
}

const DepositsTable: React.FC<IProps> = props => {
  const { t } = useTranslation(['transactions']);
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
      name: t('deposits.time').toUpperCase(),
      maxWidth: '180px',
      format: r => datetimeFromEpoch(r.time),
    },
    {
      selector: 'hash',
      name: t('deposits.hash').toUpperCase(),
      grow: 1,
      hideAtBreakpoint: 'md',
      // eslint-disable-next-line
      cell: r => (
        <ExternalLink href={`${appConfig.blockchainExplorerUrl}/${r.hash}`}>{r.hash}</ExternalLink>
      ),
    },
    {
      selector: 'amount',
      name: t('deposits.amount').toUpperCase(),
      maxWidth: '120px',
      // eslint-disable-next-line
      cell: r => <BitcoinValue value={formatBitcoin(r.amount)} />,
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleRowClicked = (row: DepositItem) => {
    navigate(`${pathname}?dialog=deposit-details`, { state: { item: row } });
  };

  return (
    <TransactionsTable<DepositItem>
      {...props}
      columns={columns}
      progressPending={props.loading}
      onRowClicked={handleRowClicked}
    />
  );
};

export default DepositsTable;
