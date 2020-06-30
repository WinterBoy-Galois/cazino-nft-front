import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import SignInModal from './SignInModal';

describe('LeaderboardsTab', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(<SignInModal show={true} loading={false} />);

    await waitForDomChange();

    // Assert
    expect(container).toMatchSnapshot();
  });
});
