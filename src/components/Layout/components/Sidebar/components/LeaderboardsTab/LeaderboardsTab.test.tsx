import React from 'react';
import { render } from '@testing-library/react';
import LeaderboardsTab from './LeaderboardsTab';

describe('LeaderboardsTab', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<LeaderboardsTab />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
