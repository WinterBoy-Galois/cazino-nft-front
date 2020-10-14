import React from 'react';
import { render } from '@testing-library/react';

import DepositsDetailsModal from '.';

describe('DepositsDetailsModal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<DepositsDetailsModal show />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
