import React from 'react';
import { render } from '@testing-library/react';

import PasswordInput from '.';

const data = {
  label: 'Password',
  value: 'Password123',
};

describe('PasswordInput', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const { container } = render(<PasswordInput {...data} />);

    // Assert
    expect(container).toMatchSnapshot();
  });

  it('should set value', () => {
    // Arrange
    const expected = data.label;

    // Act
    const { getByDisplayValue } = render(<PasswordInput value={expected} />);
    const container = getByDisplayValue(expected);

    // Assert
    expect(container).toHaveAttribute('value', expected);
  });

  it('should set name', () => {
    // Arrange
    const expected = data.value;

    // Act
    const { getByDisplayValue } = render(<PasswordInput value={data.label} name={expected} />);
    const container = getByDisplayValue(data.label);

    // Assert
    expect(container).toHaveAttribute('name', expected);
  });
});
