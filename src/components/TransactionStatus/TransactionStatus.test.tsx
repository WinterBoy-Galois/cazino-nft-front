import React from 'react';
import { render } from '@testing-library/react';
import TransactionStatus from '.';
import { TransactionStatus as Status } from '../../models/transactionStatus.model';

describe('TransactionStatus', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<TransactionStatus status={Status.DEPOSIT_CONFIRMED} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
