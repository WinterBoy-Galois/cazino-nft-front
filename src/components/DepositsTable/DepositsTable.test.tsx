import React from 'react';
import { render } from '@testing-library/react';

import DepositsTable from '.';

describe('DepositsTable', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<DepositsTable message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
