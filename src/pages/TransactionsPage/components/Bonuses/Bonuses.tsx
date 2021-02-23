import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import BonusesTable from '../../../../components/BonusesTable';
import { TRANSACTION_BONUSES } from '../../../../graphql/queries';
import useRefetchOnPageEnter from '../../../../hooks/useRefetchOnPageEnter.hook';
import TransactionsBonus from '../../../../models/transactionsBonus.model';
import styles from './Bonuses.module.scss';

interface IProps {
  bonuses: TransactionsBonus[];
  loading?: boolean;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (row: number) => void;
  paginationTotalRows?: number;
}

const Bonuses: React.FC<IProps> = ({
  bonuses,
  onChangePage,
  onChangeRowsPerPage,
  loading,
  paginationTotalRows,
}) => {
  return (
    <div className={styles.container}>
      <BonusesTable
        data={bonuses}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        loading={loading}
        paginationTotalRows={paginationTotalRows}
      />
    </div>
  );
};

export default Bonuses;

export const BonusesWithData: React.FC<RouteComponentProps> = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, loading, refetch } = useQuery(TRANSACTION_BONUSES, {
    variables: { page: page - 1, limit },
  });

  useRefetchOnPageEnter(refetch, loading);

  return (
    <Bonuses
      bonuses={data?.transactionsBonus?.items}
      onChangePage={p => setPage(p)}
      onChangeRowsPerPage={l => setLimit(l)}
      loading={loading}
      paginationTotalRows={data?.transactionsBonus?.total}
    />
  );
};
