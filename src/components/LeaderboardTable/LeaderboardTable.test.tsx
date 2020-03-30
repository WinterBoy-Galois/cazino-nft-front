import React from 'react';
import { render } from '@testing-library/react';
import LeaderboardTable from '.';

test.skip('renders', async () => {
  const { container } = render(
    <LeaderboardTable leaderboard={[]} isLoading={false} error={false} />
  );
  expect(container).toMatchSnapshot();
});
