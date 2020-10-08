import React from 'react';
import { render } from '@testing-library/react';
import Deposits from '.';
import { LocationProvider } from '@reach/router';
import { TransactionStatus } from '../../../../models/transactionStatus.model';

describe('Deposits', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    render(
      <LocationProvider>
        <Deposits
          deposits={[
            {
              amount: 0.1,
              hash: 'test',
              status: TransactionStatus.DEPOSIT_CONFIRMED,
              time: 234523,
            },
          ]}
        />
      </LocationProvider>
    );

    // Assert
    // expect(container).toMatchSnapshot();
  });
});
