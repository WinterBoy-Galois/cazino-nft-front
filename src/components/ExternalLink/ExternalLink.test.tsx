import React from 'react';
import { render } from '@testing-library/react';

import ExternalLink from '.';

describe('ExternalLink', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<ExternalLink href="https://test.de" />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
