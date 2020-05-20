import React from 'react';
import { render } from '@testing-library/react';
import MyBetsTable from '.';

test.skip('renders', async () => {
  const { container } = render(<MyBetsTable />);
  expect(container).toMatchSnapshot();
});
