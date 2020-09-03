import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import AuthOverlay from './AuthOverlay';
import { ME } from '../../graphql/queries';

const mocks = [
  {
    request: {
      query: ME,
    },
    result: {
      data: {
        me: {
          id: '204',
          username: 'tiyogi9473',
          avatarUrl: 'https://staging.jinglebets.com/ava/m5.svg',
          balance: 10,
          email: 'tiyogi9473@ioxmail.net',
          isActivated: true,
        },
      },
    },
  },
];

describe('AuthOverlay', () => {
  it('should match snapshot', async () => {
    // Arrange

    // Act
    const container = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthOverlay>Test</AuthOverlay>
      </MockedProvider>
    );

    // Assert
    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
