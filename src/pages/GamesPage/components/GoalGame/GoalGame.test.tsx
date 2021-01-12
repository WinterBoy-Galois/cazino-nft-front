import React from 'react';
import { render } from '@testing-library/react';

import GoalGame from '.';
import { LocationProvider } from '@reach/router';

describe('GoalGame', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <GoalGame />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
