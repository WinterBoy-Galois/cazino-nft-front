import React from 'react';
import { render } from '@testing-library/react';

import EmailActivationStatus from '.';

describe('EmailActivationStatus', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<EmailActivationStatus isActivated={true} email={'test@test.de'} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
