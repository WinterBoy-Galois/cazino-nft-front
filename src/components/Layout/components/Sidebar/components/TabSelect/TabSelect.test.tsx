import React from 'react';
import { render } from '@testing-library/react';
import TabSelect from './TabSelect';

describe('TabSelect', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<TabSelect />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
