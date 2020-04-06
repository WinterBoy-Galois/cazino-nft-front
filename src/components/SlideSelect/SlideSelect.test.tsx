import React from 'react';
import { render } from '@testing-library/react';
import SlideSelect from './SlideSelect';

describe('SlideSelect', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<SlideSelect selectItems={[]} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
