import React from 'react';
import { storiesOf } from '@storybook/react';
import AuthOverlay from '.';
import { createMockClient } from 'mock-apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';

const mockClient = createMockClient();

storiesOf('Components/AuthOverlay', module)
  .addDecorator(storyFn => <ApolloProvider client={mockClient}>{storyFn()}</ApolloProvider>)
  .add('default', () => <AuthOverlay />);
