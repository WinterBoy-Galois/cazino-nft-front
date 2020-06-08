import React from 'react';
import { render } from '@testing-library/react';
import Slider from '.';

test('renders', () => {
  const { container } = render(<Slider />);
  expect(container).toMatchSnapshot();
});
