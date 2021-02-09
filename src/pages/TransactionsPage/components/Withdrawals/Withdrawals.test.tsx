import React from 'react';
import { render } from '@testing-library/react';
import Withdrawals from '.';
import { LocationProvider } from '@reach/router';

describe('Withdrawals', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    render(
      <LocationProvider>
        <Withdrawals withdrawls={[]} />
      </LocationProvider>
    );

    // Assert
    // expect(container).toMatchSnapshot();
  });
});
