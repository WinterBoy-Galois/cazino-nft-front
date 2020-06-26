import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Spinner from '.';

describe('<Spinner />', () => {
  beforeEach(cleanup);

  it('renders correctly', () => {
    const { container } = render(<Spinner color="WHITE" />);
    expect(container).toMatchSnapshot();
  });
});
