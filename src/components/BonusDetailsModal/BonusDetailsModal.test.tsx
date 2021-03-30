import React from 'react';
import { render } from '@testing-library/react';
import BonusDetailsModal from '.';
import { LocationProvider } from '@reach/router';

describe('BonusDetailsModal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <BonusDetailsModal
          show={true}
          givenAt="02/16/2021 13:44:11"
          type="DAILY"
          wager={0.00069079}
          amount={0.00001234}
        />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
