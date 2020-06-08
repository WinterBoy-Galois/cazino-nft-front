import React from 'react';
import { render, cleanup } from '@testing-library/react';
import DiceResultScale from '.';

describe('<DiceResultScale />', () => {
  beforeEach(cleanup);

  it('renders correctly', () => {
    const { container } = render(<DiceResultScale />);
    expect(container).toMatchSnapshot();
  });
});
