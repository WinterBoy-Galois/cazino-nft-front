import React from 'react';
import Layout from '../Layout/Layout';
import { Router, LocationProvider } from '@reach/router';
import HomePage from '../../pages/home';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from '../Toast';
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
          <LocationProvider>
            <Layout>
              <Router>
                <HomePage path="/" />
              </Router>
            </Layout>

            <ToastContainer />
          </LocationProvider>
        </AuthOverlay>
      </GoogleReCaptchaProvider>
    </ApolloProvider>
  );
};

export default App;
