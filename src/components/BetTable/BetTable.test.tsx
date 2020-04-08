import React from 'react';
import { render, act } from '@testing-library/react';
import BetTable from '.';

test.skip('renders', async () => {
  const { container } = render(<BetTable />);
  expect(container).toMatchSnapshot();
});
