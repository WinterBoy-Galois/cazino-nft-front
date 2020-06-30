import React from 'react';
import { render } from '@testing-library/react';

import TextInput from '.';

const data = {
  name: 'username',
  label: 'Username',
  value: 'sergioalvarez',
};

describe('TextInput', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const { container } = render(<TextInput {...data} />);

    // Assert
    expect(container).toMatchSnapshot();
  });

  it('should set value', () => {
    // Arrange
    const expected = 'Firstname';

    // Act
    const { getByDisplayValue } = render(<TextInput value={expected} />);
    const container = getByDisplayValue(expected);

    // Assert
    expect(container).toHaveAttribute('value', expected);
  });

  it('should set name', () => {
    // Arrange
    const expected = 'firstname';

    // Act
    const { getByDisplayValue } = render(<TextInput value={'Firstname'} name={expected} />);
    const container = getByDisplayValue('Firstname');

    // Assert
    expect(container).toHaveAttribute('name', expected);
  });
});
