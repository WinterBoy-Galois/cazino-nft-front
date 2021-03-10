import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import AffiliatesTable from '../../../../components/AffiliatesTable';
import { TRANSACTION_AFFILIATES } from '../../../../graphql/queries';
import useRefetchOnPageEnter from '../../../../hooks/useRefetchOnPageEnter.hook';
import TransactionsAffiliates from '../../../../models/transactionsAffiliates.model';
import styles from './Affiliates.module.scss';

interface IProps {
  bets: TransactionsAffiliates[];
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  loading?: boolean;
  paginationTotalRows?: number;
}

const Affiliates: React.FC<IProps> = ({
  bets,
  onChangePage,
  onChangeRowsPerPage,
  loading,
  paginationTotalRows,
}) => {
  return (
    <div className={styles.container}>
      <AffiliatesTable
        data={bets}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        loading={loading}
        paginationTotalRows={paginationTotalRows}
      />
    </div>
  );
};

export default Affiliates;

export const AffiliatesWithData: React.FC<RouteComponentProps> = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, loading, refetch } = useQuery(TRANSACTION_AFFILIATES, {
    variables: { page: page - 1, limit },
  });

  useRefetchOnPageEnter(refetch, loading);

  return (
    <Affiliates
      bets={data?.transactionsAffiliate?.items}
      onChangePage={p => setPage(p)}
      onChangeRowsPerPage={l => setLimit(l)}
      loading={loading}
      paginationTotalRows={data?.transactionsAffiliate?.total}
    />
  );
};
