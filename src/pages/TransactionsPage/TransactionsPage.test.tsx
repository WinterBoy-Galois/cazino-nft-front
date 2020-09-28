import React from 'react';
import { render } from '@testing-library/react';

import TransactionsPage from '.';

describe('TransactionsPage', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<TransactionsPage />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
