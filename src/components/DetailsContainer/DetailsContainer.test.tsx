import React from 'react';
import { render } from '@testing-library/react';
import DetailsContainer from '.';

describe('DetailsContainer', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<DetailsContainer>Test</DetailsContainer>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
