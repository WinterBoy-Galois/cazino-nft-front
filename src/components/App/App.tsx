import React, { useMemo } from 'react';
import Layout from '../Layout/Layout';
import { Router } from '@reach/router';
import HomePage from '../../pages/home';
import { ApolloProvider } from '@apollo/react-hooks';
import AuthOverlay from '../AuthOverlay';
import getApolloClient from '../../graphql/client';
import { useStateValue } from '../../state';

const App: React.FC = () => {
  const [
    {
      auth: { accessToken },
    },
    dispatch,
  ] = useStateValue();
  const client = useMemo(
    () =>
      getApolloClient(
        t => dispatch({ type: 'AUTH_TOKEN_REFRESH', payload: { accessToken: t } }),
        accessToken
      ),
    [dispatch, accessToken]
  );

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
