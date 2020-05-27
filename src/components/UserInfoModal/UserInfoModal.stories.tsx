import React from 'react';
import { storiesOf } from '@storybook/react';
import UserInfoModal from '.';
import { createMockClient } from 'mock-apollo-client';
import { USER_INFO } from '../../graphql/queries';
import { ApolloProvider } from '@apollo/react-hooks';
import introspectionQueryResultData from '../../graphql/fragmentTypes.json';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { action } from '@storybook/addon-actions';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

storiesOf('Components/UserInfoModal', module)
  .add('default', () => {
    const cache = new InMemoryCache({
      addTypename: false,
      fragmentMatcher,
    });

    const client = createMockClient({ cache });
    client.setRequestHandler(USER_INFO, () =>
      Promise.resolve({
        data: {
          userInfo: {
            __typename: 'PublicUser',
            id: '1',
            username: 'AuYHKS',
            avatarUrl: 'https://dev.gambilife.com/ava/m2.svg',
            totalWager: 0,
            totalProfit: 0,
            mostPlayed: 'CLAMS',
            totalBets: 0,
            luckyBets: 0,
          },
        },
      })
    );

    return (
      <ApolloProvider client={client}>
        <UserInfoModal show={true} userId="1" onClose={action('close modal')} />
      </ApolloProvider>
    );
  })
  .add('anonymous user', () => {
    const cache = new InMemoryCache({
      addTypename: false,
      fragmentMatcher,
    });

    const client = createMockClient({ cache });
    client.setRequestHandler(USER_INFO, () =>
      Promise.resolve({
        data: {
          userInfo: {
            __typename: 'PublicUser',
            id: '1',
            username: null,
            avatarUrl: 'https://dev.gambilife.com/ava/ano.svg',
            totalWager: null,
            totalProfit: null,
            mostPlayed: 'CLAMS',
            totalBets: 482,
            luckyBets: 4,
          },
        },
      })
    );

    return (
      <ApolloProvider client={client}>
        <UserInfoModal show={true} userId="1" onClose={action('close modal')} />
      </ApolloProvider>
    );
  })
  .add('User not found', () => {
    const cache = new InMemoryCache({
      addTypename: false,
      fragmentMatcher,
    });

    const client = createMockClient({ cache });
    client.setRequestHandler(USER_INFO, () =>
      Promise.resolve({
        data: {
          userInfo: {
            __typename: 'GenericErrorArray',
            errors: [{ type: '', field: '', messageKey: '' }],
          },
        },
      })
    );

    return (
      <ApolloProvider client={client}>
        <UserInfoModal show={true} userId="1" onClose={action('close modal')} />
      </ApolloProvider>
    );
  })
  .add('loading', () => {
    const client = createMockClient();
    client.setRequestHandler(USER_INFO, () => new Promise(() => null));

    return (
      <ApolloProvider client={client}>
        <UserInfoModal show={true} userId="1" onClose={action('close modal')} />
      </ApolloProvider>
    );
  })
  .add('graphlQL error', () => {
    const client = createMockClient();
    client.setRequestHandler(USER_INFO, () =>
      Promise.resolve({ data: null, errors: [{ message: 'GraphQL Error' }] })
    );

    return (
      <ApolloProvider client={client}>
        <UserInfoModal show={true} userId="1" onClose={action('close modal')} />
      </ApolloProvider>
    );
  })
  .add('network error', () => {
    const client = createMockClient();
    client.setRequestHandler(USER_INFO, () => Promise.reject(new Error('Network error')));

    return (
      <ApolloProvider client={client}>
        <UserInfoModal show={true} userId="1" onClose={action('close modal')} />
      </ApolloProvider>
    );
  });
