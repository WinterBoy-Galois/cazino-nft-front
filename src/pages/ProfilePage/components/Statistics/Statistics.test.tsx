import React from 'react';
import { render } from '@testing-library/react';

import Statistics from '.';

describe('Statistics', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Statistics loading={false} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
