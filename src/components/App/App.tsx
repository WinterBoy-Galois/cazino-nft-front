import React from 'react';
import Layout from '../Layout/Layout';
import { Router, LocationProvider } from '@reach/router';
import HomePage from '../../pages/HomePage';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from '../Toast';
import AuthOverlay from '../AuthOverlay';
import { useApolloClient } from '../../hooks/useApolloClient.hook';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { appConfig } from '../../common/config';
import Referrals from '../Referrals';
import { ProfilePageWithData } from '../../pages/ProfilePage/ProfilePage';
import ScrollToTop from '../ScrollToTop';

const App: React.FC = () => {
  const client = useApolloClient();

  return (
    <ApolloProvider client={client}>
      <GoogleReCaptchaProvider reCaptchaKey={appConfig.reCaptchaSiteKey}>
        <AuthOverlay>
          <LocationProvider>
            <ScrollToTop />

            <Layout>
              <Router>
                <HomePage path="/" />
                <ProfilePageWithData path="/profile" />
              </Router>
            </Layout>

            <ToastContainer />
            <Referrals />
          </LocationProvider>
        </AuthOverlay>
      </GoogleReCaptchaProvider>
    </ApolloProvider>
  );
};

export default App;
