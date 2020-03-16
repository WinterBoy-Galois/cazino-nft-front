import React from 'react';
import { render } from '@testing-library/react';
import LanguageSelect from './LanguageSelect';

describe('LanguageSelect', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<LanguageSelect />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
