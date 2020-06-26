import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Close from '.';

describe('<Close />', () => {
  beforeEach(cleanup);

  it('renders correctly', () => {
    const { container } = render(<Close />);
    expect(container).toMatchSnapshot();
  });
});
