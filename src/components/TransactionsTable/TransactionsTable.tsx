import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import { breakpoints } from '../../hooks/useBreakpoint.hook';
import Loading from '../Loading';
import { TableColumn } from './lib/tableColumn';
import { styles } from './TransactionsTable.styles';

interface IProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  paginationTotalRows?: number;
  onChangePage?: (page: number, totalRows: number) => void;
  paginationPerPage?: number;
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
  paginationRowsPerPageOptions?: number[];
  progressPending?: boolean;
  onRowClicked?: (row: T, event: MouseEvent) => void;
}

function TransactionsTable<T>(props: IProps<T>) {
  const { t } = useTranslation(['transactions']);

  const columns = useMemo(
    () =>
      props.columns.map(c => {
        const bp = breakpoints.find(b => b.name === c.hideAtBreakpoint);

        if (!bp) {
          return c;
        }

        return { ...c, hide: bp.minWidth };
      }),
    [props.columns]
  );

  return (
    <DataTable<T>
      {...props}
      pagination
      noHeader
      paginationServer
      customStyles={styles}
      striped
      columns={columns}
      paginationComponentOptions={{
        rowsPerPageText: t('table.rowsPerPage'),
        rangeSeparatorText: t('table.rangeSeparator'),
      }}
      noDataComponent={t('common:errors.NO_DATA')}
      progressComponent={
        <div className="w-100 h-100">
          <Loading />
        </div>
      }
    />
  );
}

export default TransactionsTable;
