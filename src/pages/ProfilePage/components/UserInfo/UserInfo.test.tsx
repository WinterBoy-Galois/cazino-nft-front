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
        <UserInfo
          user={{
            id: '123',
            avatarUrl: `https://test.de/ava/m1.svg`,
            isActivated: true,
            username: 'test',
          }}
        />
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
