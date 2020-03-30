import React from 'react';
import Layout from '../Layout/Layout';
import { Router } from '@reach/router';
import HomePage from '../../pages/home';
import { StateProvider } from '../../state';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../../graphql/client';

const App: React.SFC = () => {
  return (
    <StateProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Router>
            <HomePage path="/" />
          </Router>
        </Layout>
      </ApolloProvider>
    </StateProvider>
  );
};

export default App;
