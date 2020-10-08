import React from 'react';

import DepositsTable from '.';
import { LocationProvider } from '@reach/router';

export default {
  title: 'Components/DepositsTable',
  component: DepositsTable,
  decorators: [
    (storyFn: () => React.ReactElement) => <LocationProvider>{storyFn()}</LocationProvider>,
  ],
};

const data = {
  data: [],
};

export const Default = () => <DepositsTable data={data.data} />;
