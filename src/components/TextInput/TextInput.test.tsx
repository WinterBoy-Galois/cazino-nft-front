import React from 'react';
import { render } from '@testing-library/react';

import TextInput from '.';

test('renders TextInput', () => {
  const { container } = render(<TextInput />);
  expect(container).toMatchSnapshot();
});
