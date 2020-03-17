import React from 'react';
import { storiesOf } from '@storybook/react';
import BetTable from '.';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../../graphql/client';

storiesOf('Components/BetTable', module).add('default', () => (
  <ApolloProvider client={client}>
    <BetTable />
  </ApolloProvider>
));
