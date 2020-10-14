import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import DepositsTable from '../../../../components/DepositsTable';
import { DEPOSITS } from '../../../../graphql/queries';
import useRefetchOnPageEnter from '../../../../hooks/useRefetchOnPageEnter.hook';
import { DepositItem } from '../../../../models/depositItem.model';
import styles from './Deposits.module.scss';

interface IProps {
  deposits: DepositItem[];
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  loading?: boolean;
  paginationTotalRows?: number;
}

const Deposits: React.FC<IProps> = ({
  deposits,
  onChangePage,
  onChangeRowsPerPage,
  loading,
  paginationTotalRows,
}) => {
  return (
    <div className={styles.container}>
      <DepositsTable
        data={deposits}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        loading={loading}
        paginationTotalRows={paginationTotalRows}
      />
    </div>
  );
};

export default Deposits;

export const DepositsWithData: React.FC<RouteComponentProps> = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, loading, refetch } = useQuery(DEPOSITS, { variables: { page: page - 1, limit } });

  useRefetchOnPageEnter(refetch, loading);

  return (
    <Deposits
      deposits={data?.transactionsDeposit?.items}
      onChangePage={p => setPage(p)}
      onChangeRowsPerPage={l => setLimit(l)}
      loading={loading}
      paginationTotalRows={data?.transactionsDeposit?.total}
    />
  );
};
