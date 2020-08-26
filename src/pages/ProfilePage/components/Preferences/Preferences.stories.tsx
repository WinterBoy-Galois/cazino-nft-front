import React from 'react';
import Preferences from '.';
import { LocationProvider } from '@reach/router';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

export default {
  title: 'Components/Preferences',
  component: Preferences,
  decorators: [
    (storyFn: () => React.ReactNode) => <LocationProvider>{storyFn()}</LocationProvider>,
  ],
};

const data = {
  preferences: { hideUsername: false, hideProfit: true, hideWager: false },
};

export const Default = () => (
  <Preferences
    preferences={{
      hideUsername: boolean('Hide username', data.preferences.hideUsername),
      hideProfit: boolean('Hide profit', data.preferences.hideProfit),
      hideWager: boolean('Hide wager', data.preferences.hideWager),
    }}
    onPreferenceChange={action('preferences changed')}
    loading={boolean('Loading', false)}
  />
);
