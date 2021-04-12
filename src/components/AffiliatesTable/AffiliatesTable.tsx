import React from 'react';
import { useLocation, useNavigate } from '@reach/router';
import { datetimeFromEpoch } from '../../common/util/date.util';
import { formatBitcoin } from '../../common/util/format.util';
import TransactionsAffiliates from '../../models/transactionsAffiliates.model'; // replace while complete
import BitcoinValue from '../BitcoinValue';
import TransactionsTable from '../TransactionsTable';
import { TableColumn } from '../TransactionsTable/lib/tableColumn';
import { useTranslation } from 'react-i18next';
interface IProps {
  data: TransactionsAffiliates[];
  paginationTotalRows?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  loading?: boolean;
}

const AffiliatesTable: React.FC<IProps> = props => {
  const { t } = useTranslation(['transactions']);
  const columns: TableColumn<TransactionsAffiliates>[] = [
    {
      selector: 'gameid',
      name: '',
      width: '16px',
      // eslint-disable-next-line
    },
    {
      selector: 'time',
      name: t('affiliates.time').toUpperCase(),
      minWidth: '165px',
      format: r => datetimeFromEpoch(r.claimedAt),
    },
    {
      selector: 'commission',
      name: t('affiliates.commission').toUpperCase(),
      // eslint-disable-next-line
      cell: r => <BitcoinValue value={formatBitcoin(r.amount)} />,
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleRowClicked = (row: TransactionsAffiliates) => {
    navigate(`${pathname}?dialog=affiliates-details`, {
      state: {
        time: datetimeFromEpoch(row.claimedAt),
        commission: row.amount,
      },
    });
  };

  return (
    <TransactionsTable<TransactionsAffiliates>
      {...props}
      columns={columns}
      progressPending={props.loading}
      onRowClicked={handleRowClicked}
    />
  );
};

export default AffiliatesTable;
