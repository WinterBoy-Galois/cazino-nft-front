import React from 'react';
import { render } from '@testing-library/react';
import LatestBetsTable from '.';

test.skip('renders', async () => {
  const { container } = render(<LatestBetsTable />);
  expect(container).toMatchSnapshot();
});
