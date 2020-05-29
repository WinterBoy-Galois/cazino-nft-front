import React from 'react';
import { render } from '@testing-library/react';
import DetailList from '.';

describe('DetailList', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<DetailList />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
