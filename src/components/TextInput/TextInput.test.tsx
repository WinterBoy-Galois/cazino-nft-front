import React from 'react';
import { render } from '@testing-library/react';

import TextInput from '.';

const data = {
  name: 'username',
  label: 'Username',
  value: 'sergioalvarez',
  validationMessage: 'Username already exists',
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

  it('should display validation error', () => {
    // Arrange
    const expected = data.validationMessage;

    // Act
    const { getByText } = render(<TextInput value={data.value} validationMessage={expected} />);
    const container = getByText(expected);

    // Assert
    expect(container).toMatchInlineSnapshot(`
      <div
        class="inputField__error"
      >
        Username already exists
      </div>
    `);
  });
});
