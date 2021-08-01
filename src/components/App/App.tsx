import React from 'react';
import { LocationProvider, Router } from '@reach/router';
import HomePage from '../../pages/HomePage';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from '../Toast';
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
import { CustomPage } from '../../pages/CustomPage';

import { UserLayer } from '../../user';
import { useApolloClient } from '../../graphql/newClient';
import { useUserState } from '../../user/UserProvider';
import { logoutWithModalAction } from '../../user/user.actions';

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
  const [{ accessToken }, userDispatch] = useUserState();
  const logout = () => {
    if (!accessToken) return;
    return userDispatch(logoutWithModalAction());
  };

  const client = useApolloClient(logout);
  return (
    <ApolloProvider client={client}>
      <GoogleReCaptchaProvider reCaptchaKey={appConfig.reCaptchaSiteKey}>
        <UserLayer>
          <LocationProvider>
            <ScrollToTop />

            <Router>
              {/* Public Routes */}
              <LayoutPage path="/" component={HomePage} />
              <LayoutPage path="/games/*" component={GamesPage} />
              <Page500 path="/servererror" />
              <Page404 default />

              {/* Custom Pages*/}
              <CustomPage path="/bonuses-intro" fileName="bonusesIntro" />
              <CustomPage path="/affiliates-intro" fileName="affiliatesIntro" />
              <CustomPage path="/fairness" fileName="fairness" />
              <CustomPage path="/faq" fileName="faq" />
              <CustomPage path="/privacy-policy" fileName="privacyPolicy" />
              <CustomPage path="/terms-of-use" fileName="termsOfUse" />

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
        </UserLayer>
      </GoogleReCaptchaProvider>
    </ApolloProvider>
  );
};

export default App;
