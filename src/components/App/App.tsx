import React from 'react';
import Layout from '../Layout/Layout';
import { Router } from '@reach/router';
import HomePage from '../../pages/home';
import { StateProvider } from '../../state';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../../graphql/client';
import { ToastContainer } from 'react-toastify';
import { appConfig } from '../../common/config';

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

      <ToastContainer
        hideProgressBar={appConfig.toastHideProgressbar}
        autoClose={appConfig.toastAutoCloseDuration}
        position={appConfig.toastPosition}
      />
    </StateProvider>
  );
};

export default App;
