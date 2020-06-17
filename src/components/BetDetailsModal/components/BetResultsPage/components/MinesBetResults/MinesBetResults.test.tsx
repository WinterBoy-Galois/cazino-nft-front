import React from 'react';
import { render } from '@testing-library/react';
import MinesBetResults from '.';

describe('MinesBetResults', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <MinesBetResults
        fieldCount={24}
        minePositions={[4, 10, 22]}
        openedFields={[0, 5, 10, 15, 24]}
      />
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
