import React from 'react';
import { useLocation, useNavigate } from '@reach/router';
// import { datetimeFromEpoch } from '../../common/util/date.util';
// import { formatBitcoin } from '../../common/util/format.util';
import TransactionsWithdraw from '../../models/transactionsWithdraw.model';
// import BitcoinValue from '../BitcoinValue';
import TransactionsTable from '../TransactionsTable';
import { TableColumn } from '../TransactionsTable/lib/tableColumn';
// import BitcoinProfit from '../BitcoinProfit';
// import GameIcon from '../GameIcon';
// import styles from './WithdrawalsTable.module.scss';
// import { useStateValue } from '../../state';
interface IProps {
  data: TransactionsWithdraw[];
  paginationTotalRows?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  loading?: boolean;
}

const WithdrawalsTable: React.FC<IProps> = props => {
  const columns: TableColumn<TransactionsWithdraw>[] = [];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [{ auth }] = useStateValue();
  const handleRowClicked = () => {
    navigate(`${pathname}?dialog=withdraw-details`, {
      state: {},
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
