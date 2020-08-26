import React from 'react';
import { render } from '@testing-library/react';

import UserInfo from '.';
import { LocationProvider } from '@reach/router';

describe('UserInfo', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <UserInfo user={{ id: '123', avatarUrl: '', isActivated: true, username: 'test' }} />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
