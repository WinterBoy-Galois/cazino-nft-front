import React from 'react';
import { render } from '@testing-library/react';

import PasswordInput from '.';

test('renders PasswordInput', () => {
  const { container } = render(<PasswordInput />);
  expect(container).toMatchSnapshot();
});
