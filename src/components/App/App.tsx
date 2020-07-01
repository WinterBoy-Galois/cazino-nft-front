import React, { useMemo } from 'react';
import Layout from '../Layout/Layout';
import { Router } from '@reach/router';
import HomePage from '../../pages/home';
import { ApolloProvider } from '@apollo/react-hooks';
import AuthOverlay from '../AuthOverlay';
import getApolloClient from '../../graphql/client';

const App: React.FC = () => {
  const client = useMemo(() => getApolloClient(), []);

  return (
    <ApolloProvider client={client}>
      <AuthOverlay>
        <Layout>
          <Router>
            <HomePage path="/" />
          </Router>
        </Layout>
      </AuthOverlay>
    </ApolloProvider>
  );
};

export default App;
