import React from 'react';
import { render } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { LocationProvider } from '@reach/router';

describe('HomePage', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <ProfilePage statisticsLoading={false} />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
