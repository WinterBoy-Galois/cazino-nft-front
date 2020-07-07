import React from 'react';
import Layout from '../Layout/Layout';
import { Router } from '@reach/router';
import HomePage from '../../pages/home';
import { ApolloProvider } from '@apollo/react-hooks';
import AuthOverlay from '../AuthOverlay';
import { useApolloClient } from '../../hooks/useApolloClient.hook';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { appConfig } from '../../common/config';

const App: React.FC = () => {
  const client = useApolloClient();

  return (
    <ApolloProvider client={client}>
      <GoogleReCaptchaProvider reCaptchaKey={appConfig.reCaptchaSiteKey}>
        <AuthOverlay>
          <Layout>
            <Router>
              <HomePage path="/" />
            </Router>
          </Layout>
        </AuthOverlay>
      </GoogleReCaptchaProvider>
    </ApolloProvider>
  );
};

export default App;
