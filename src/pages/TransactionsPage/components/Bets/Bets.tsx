import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import BetsTable from '../../../../components/BetsTable';
import { TRANSACTION_BETS } from '../../../../graphql/queries';
import useRefetchOnPageEnter from '../../../../hooks/useRefetchOnPageEnter.hook';
import TransactionsBet from '../../../../models/transactionsBet.model';
import styles from './Bets.module.scss';

interface IProps {
  bets: TransactionsBet[];
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  loading?: boolean;
  paginationTotalRows?: number;
}

const Bets: React.FC<IProps> = ({
  bets,
  onChangePage,
  onChangeRowsPerPage,
  loading,
  paginationTotalRows,
}) => {
  return (
    <div className={styles.container}>
      <BetsTable
        data={bets}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        loading={loading}
        paginationTotalRows={paginationTotalRows}
      />
    </div>
  );
};

export default Bets;

export const BetsWithData: React.FC<RouteComponentProps> = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, loading, refetch } = useQuery(TRANSACTION_BETS, {
    variables: { page: page - 1, limit },
  });

  useRefetchOnPageEnter(refetch, loading);

  return (
    <Bets
      bets={data?.transactionsBet?.items}
      onChangePage={p => setPage(p)}
      onChangeRowsPerPage={l => setLimit(l)}
      loading={loading}
      paginationTotalRows={data?.transactionsBet?.total}
    />
  );
};
