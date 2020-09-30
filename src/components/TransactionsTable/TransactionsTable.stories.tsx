import React, { useEffect, useState } from 'react';
import { boolean, object } from '@storybook/addon-knobs';

import TransactionsTable from '.';
import { action } from '@storybook/addon-actions';
import { TableColumn } from './lib/tableColumn';

export default {
  title: 'Components/TransactionsTable',
  component: TransactionsTable,
  decorators: [
    (storyFn: () => React.ReactElement) => (
      <div style={{ padding: '2rem', backgroundColor: '#113352' }}>{storyFn()}</div>
    ),
  ],
};

const data = {
  columns: [
    { selector: 'status', name: '', maxWidth: '180px' },
    { selector: 'time', name: 'Time', maxWidth: '220px' },
    { selector: 'hash', name: 'Hash', grow: 1, hideAtBreakpoint: 'md' },
    { selector: 'amount', name: 'Amount', maxWidth: '100px' },
  ],
  data: [
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600330565809,
      hash: 'b7e19012965f28872384703600f0242d0676136350b4b5e2eeffe03367008d3f',
      amount: 0.001,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332337322,
      hash: 'b5c29e9c14e3ce241eefa0bd0a654762733cc8eb1fa0eb8b8160ae935d89b7d9',
      amount: 0.0001,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332447372,
      hash: '41f34559b3e4e4f27d83710974ea1a946a4360d23c0bc2af9b9fa557fa781c71',
      amount: 0.00003,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332547389,
      hash: 'c39ff857c394edc428b6761b588bcce04a98fbaf59821db61b6d2a8550b01813',
      amount: 0.00003,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332592402,
      hash: 'cb5012a248960003e833fee23b9b63e0213508aec1a9212f85acae55368fff0c',
      amount: 0.000031,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332652455,
      hash: '7a7e0611bc2c40288d5acc82b8b6122b361d5ee0c29641a5d9d74e1fcfd8c2fe',
      amount: 0.000032,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332712467,
      hash: 'e2a88a58dea9988d5b9dbe23f987d039dbd1cceb8476842d8895f9d2c7e97ad2',
      amount: 0.0001,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332777484,
      hash: 'fcc14bd6338e5fd8af8a93b93e44447cde98133fa84dc62579f0adfd329e0d32',
      amount: 0.000091,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332862506,
      hash: 'd14efff16fdc8d5b999277714e41c77b5899f108c4565ca3e79d6a0dc3b852b9',
      amount: 0.00042,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600333047549,
      hash: '2600d16550fb9348e70a4d15ac7c0de73eee18bec4e5290b9ee31d798fee215b',
      amount: 0.00008,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600330565809,
      hash: 'b7e19012965f28872384703600f0242d0676136350b4b5e2eeffe03367008d3f',
      amount: 0.001,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332337322,
      hash: 'b5c29e9c14e3ce241eefa0bd0a654762733cc8eb1fa0eb8b8160ae935d89b7d9',
      amount: 0.0001,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332447372,
      hash: '41f34559b3e4e4f27d83710974ea1a946a4360d23c0bc2af9b9fa557fa781c71',
      amount: 0.00003,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332547389,
      hash: 'c39ff857c394edc428b6761b588bcce04a98fbaf59821db61b6d2a8550b01813',
      amount: 0.00003,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332712467,
      hash: 'e2a88a58dea9988d5b9dbe23f987d039dbd1cceb8476842d8895f9d2c7e97ad2',
      amount: 0.0001,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332592402,
      hash: 'cb5012a248960003e833fee23b9b63e0213508aec1a9212f85acae55368fff0c',
      amount: 0.000031,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332652455,
      hash: '7a7e0611bc2c40288d5acc82b8b6122b361d5ee0c29641a5d9d74e1fcfd8c2fe',
      amount: 0.000032,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332862506,
      hash: 'd14efff16fdc8d5b999277714e41c77b5899f108c4565ca3e79d6a0dc3b852b9',
      amount: 0.00042,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600332777484,
      hash: 'fcc14bd6338e5fd8af8a93b93e44447cde98133fa84dc62579f0adfd329e0d32',
      amount: 0.000091,
    },
    {
      status: 'DEPOSIT_CONFIRMED',
      time: 1600333047549,
      hash: '2600d16550fb9348e70a4d15ac7c0de73eee18bec4e5290b9ee31d798fee215b',
      amount: 0.00008,
    },
  ],
  paginationPerPage: 5,
};

export const Default = () => {
  const rowData = object('Data', data.data);
  const [rowsPerPage, setRowsPerPage] = useState(data.paginationPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState(
    rowData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  );

  useEffect(() => {
    setRows(rowData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
  }, [rowData, currentPage, rowsPerPage]);

  return (
    <TransactionsTable
      columns={object('Columns', data.columns) as TableColumn<any>[]}
      data={rows}
      paginationTotalRows={data.data.length}
      onChangePage={page => {
        action('onChangePage');
        setCurrentPage(page);
      }}
      paginationPerPage={rowsPerPage}
      onChangeRowsPerPage={r => setRowsPerPage(r)}
      paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
      progressPending={boolean('Loading', false)}
    />
  );
};
