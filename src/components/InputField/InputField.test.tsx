import React from 'react';
import { render } from '@testing-library/react';

import InputField from '.';

test('renders InputField', () => {
  const { container } = render(<InputField />);
  expect(container).toMatchSnapshot();
});
