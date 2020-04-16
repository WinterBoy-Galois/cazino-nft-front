import React from 'react';
import { render } from '@testing-library/react';
import Modal from '.';

describe('Modal', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<Modal show={true}>test</Modal>);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
