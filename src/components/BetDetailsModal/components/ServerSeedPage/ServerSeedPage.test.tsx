import React from 'react';
import { render } from '@testing-library/react';
import ServerSeedPage from '.';

describe('BetDetailsPage', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<ServerSeedPage loading={false} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
