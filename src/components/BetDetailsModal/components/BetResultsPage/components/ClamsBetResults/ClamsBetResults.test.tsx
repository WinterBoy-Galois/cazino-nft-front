import React from 'react';
import { render } from '@testing-library/react';
import ClamsBetResults from '.';

describe('ClamsBetResults', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<ClamsBetResults result={1} selection={[0, 4]} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
