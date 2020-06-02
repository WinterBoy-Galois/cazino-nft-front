import React from 'react';
import { render } from '@testing-library/react';
import GameIconAndText from '.';
import { GameTypes } from '../../models/gameTypes.model';

describe('GameIconAndText', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(<GameIconAndText game={GameTypes.CLAMS} />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
