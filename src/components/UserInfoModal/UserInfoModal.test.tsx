import React from 'react';
import { render } from '@testing-library/react';
import Modal from '.';

test('render', () => {
  const { container } = render(<Modal show={true} />);
  expect(container).toMatchSnapshot();
});
