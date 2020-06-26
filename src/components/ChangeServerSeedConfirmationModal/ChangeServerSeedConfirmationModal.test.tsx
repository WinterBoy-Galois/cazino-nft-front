import React from 'react';
import { render } from '@testing-library/react';
import ChangeServerSeedConfirmationModal from '.';

describe('LeaderboardsTab', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(<ChangeServerSeedConfirmationModal show={true} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
