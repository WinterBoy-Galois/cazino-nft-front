import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import BottomBar from './BottomBar';
import { LocationProvider } from '@reach/router';
import { FAUCET_INFO } from '../../../../graphql/queries';

const mocks = [
  {
    request: {
      query: FAUCET_INFO,
    },
    result: {
      data: {
        faucetInfo: { amount: 3300331, every: 30, canClaim: true, __typename: 'FaucetInfo' },
      },
    },
  },
];

describe('BottomBar', () => {
  it('should match snapshot', () => {
    // Arrange

    // Act
    const container = render(
      <LocationProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <BottomBar />
        </MockedProvider>
      </LocationProvider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
