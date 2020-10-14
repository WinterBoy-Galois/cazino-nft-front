import React from 'react';
import { render } from '@testing-library/react';
import TransactionsTable from '.';

describe('TransactionsTable', () => {
  it.skip('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <TransactionsTable
        columns={[{ name: 'test' }]}
        data={[{ test: 'test' }]}
        paginationTotalRows={1000}
      />
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
