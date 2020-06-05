import React from 'react';
import { render } from '@testing-library/react';
import GameIcon from '.';
import { GameTypes } from '../../models/gameTypes.model';

describe('GameIcon', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<GameIcon game={GameTypes.GOALS} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
