import React from 'react';
import { render } from '@testing-library/react';

import GamesPage from '.';

describe('GamesPage', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<GamesPage message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
