import React, { ErrorInfo, useEffect } from 'react';
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
import GamesPage from '../../pages/GamesPage';
import BonusesPage from '../../pages/BonusesPage/BonusesPage';
import AffiliatesPage from '../../pages/AffiliatesPage';
import SeedPage from '../../pages/SeedPage';
import Page404 from '../../pages/Page404';
import Page500 from '../../pages/Page500';
import LayoutPage from '../LayoutPage';

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
export const bonus_claim_v1 = require('../../sounds/bonus-claim-v1.mp3');
export const countdown_v1 = require('../../sounds/countdown-v1.mp3');

const App: React.FC = () => {
  const client = useApolloClient();
  return (
    <ApolloProvider client={client}>
      <GoogleReCaptchaProvider reCaptchaKey={appConfig.reCaptchaSiteKey}>
        <AuthOverlay>
          <LocationProvider>
            <ScrollToTop />

            <Router>
              {/* Public Routes */}
              <LayoutPage path="/" component={HomePage} />
              <LayoutPage path="/games/*" component={GamesPage} />
              <Page500 path="/servererror" />
              <Page404 default />

              {/* Protected Routes */}
              <LayoutPage path="/profile" isAuthNeeded component={ProfilePageWithData} />
              <LayoutPage path="/transactions/*" isAuthNeeded component={TransactionsPage} />
              <LayoutPage path="/seeds" isAuthNeeded component={SeedPage} />
              <LayoutPage path="/bonuses" component={BonusesPage} />
              <LayoutPage path="/affiliates" component={AffiliatesPage} />
            </Router>

            <ToastContainer />
            <Referrals />
          </LocationProvider>
        </AuthOverlay>
      </GoogleReCaptchaProvider>
    </ApolloProvider>
  );
};

export default App;
