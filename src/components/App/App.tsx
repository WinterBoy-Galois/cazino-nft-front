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
import TransactionsPage from '../../pages/TransactionsPage';
import AuthRoute from '../AuthRoute';
import GamesPage from '../../pages/GamesPage';
import BonusesPage from '../../pages/BonusesPage/BonusesPage';
import AffiliatesPage from '../../pages/AffiliatesPage';

export const toast_v1 = require('../../sounds/toast-v1.mp3');
export const balance_updated_v1 = require('../../sounds/balance-updated-v1.mp3');
export const button_click_v1 = require('../../sounds/button-click-v1.mp3');

export const goal_select_v1 = require('../../sounds/goals-select-v1.mp3');
export const goal_win_v1 = require('../../sounds/goals-win-v1.mp3');
export const goal_lost_v1 = require('../../sounds/goals-lost-v1.mp3');

export const mines_win_v1 = require('../../sounds/mines-win-v1.mp3');
export const mines_lost_v1 = require('../../sounds/mines-lost-v1.mp3');

export const clams_win_v1 = require('../../sounds/clams-win-v1.mp3');
export const clams_lost_v1 = require('../../sounds/clams-lost-v1.mp3');
export const clams_select_v1 = require('../../sounds/clams-select-v1.mp3');

export const dice_hit_v1 = require('../../sounds/dice-hit-v1.mp3');
export const dice_slider_v1 = require('../../sounds/dice-slider-v1.mp3');
export const dice_win_v1 = require('../../sounds/dice-win-v1.mp3');
export const dice_lost_v1 = require('../../sounds/dice-lost-v1.mp3');

export const bonus_received_v1 = require('../../sounds/bonus-received-v1.mp3');
export const countdown_v1 = require('../../sounds/countdown-v1.mp3');

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
                {/* Public Routes */}
                <HomePage path="/" />
                <GamesPage path="/games/*" />

                {/* Protected Routes */}
                <AuthRoute path="/profile" component={ProfilePageWithData} />
                <AuthRoute path="/transactions/*" component={TransactionsPage} />
                <BonusesPage path="/bonuses" />
                <AffiliatesPage path="/affiliates" />
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
