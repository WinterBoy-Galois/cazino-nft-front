import React from 'react';
import { render } from '@testing-library/react';

import CardHeadline from '.';

describe('CardHeadline', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<CardHeadline>Headline</CardHeadline>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
