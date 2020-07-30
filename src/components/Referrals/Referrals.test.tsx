import React from 'react';
import { render } from '@testing-library/react';

import Referrals from '.';

describe('Referrals', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Referrals message="Hello World!" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
