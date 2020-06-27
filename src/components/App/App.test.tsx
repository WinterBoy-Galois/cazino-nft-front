import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<App />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
