import React from 'react';
import { text } from '@storybook/addon-knobs';

import DepositsTable from '.';

export default {
  title: 'Components/DepositsTable',
  component: DepositsTable,
};

const data = {
  data: [],
};

export const Default = () => <DepositsTable data={data.data} />;
