import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import WithdrawalsTable from '../../../../components/WithdrawalsTable';
import { TRANSACTION_WITHDRAWALS } from '../../../../graphql/queries';
import useRefetchOnPageEnter from '../../../../hooks/useRefetchOnPageEnter.hook';
import TransactionsWithdraw from '../../../../models/transactionsWithdraw.model';
import styles from './Withdrawals.module.scss';

interface IProps {
  withdrawls: TransactionsWithdraw[];
  loading?: boolean;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  paginationTotalRows?: number;
}

const Withdrawals: React.FC<IProps> = ({
  withdrawls,
  onChangePage,
  onChangeRowsPerPage,
  loading,
  paginationTotalRows,
}) => {
  return (
    <div className={styles.container}>
      <WithdrawalsTable
        data={withdrawls}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        loading={loading}
        paginationTotalRows={paginationTotalRows}
      />
    </div>
  );
};

export default Withdrawals;

export const WithdrawalsWithData: React.FC<RouteComponentProps> = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, loading, refetch } = useQuery(TRANSACTION_WITHDRAWALS, {
    variables: { page: page - 1, limit },
  });

  useRefetchOnPageEnter(refetch, loading);

  return (
    <Withdrawals
      withdrawls={data?.transactionsWithdraw?.items}
      onChangePage={p => setPage(p)}
      onChangeRowsPerPage={l => setLimit(l)}
      loading={loading}
      paginationTotalRows={data?.transactionsBet?.total}
    />
  );
};
