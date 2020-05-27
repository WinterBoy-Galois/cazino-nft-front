import React from 'react';
import { render } from '@testing-library/react';
import PageableModal from '.';

describe('PageableModal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<PageableModal />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
