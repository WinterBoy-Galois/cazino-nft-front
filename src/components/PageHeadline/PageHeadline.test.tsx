import React from 'react';
import { render } from '@testing-library/react';

import PageHeadline from '.';

describe('PageHeadline', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<PageHeadline>Headline</PageHeadline>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
