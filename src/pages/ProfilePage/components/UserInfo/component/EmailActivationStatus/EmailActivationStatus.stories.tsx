import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';

import EmailActivationStatus from '.';

export default {
  title: 'Components/EmailActivationStatus',
  component: EmailActivationStatus,
};

const data = {
  email: 'test@test.de',
};

export const Default = () => (
  <EmailActivationStatus
    email={text('Email', data.email)}
    isActivated={boolean('IsActivated', false)}
  />
);
