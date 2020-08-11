import React from 'react';
import { render } from '@testing-library/react';

import PageContentContainer from '.';

describe('PageContentContainer', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<PageContentContainer />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
