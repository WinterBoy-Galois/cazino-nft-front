import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import PasswordRecoveryModal from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/PasswordRecoveryModal',
  component: PasswordRecoveryModal,
};

const data = {
  errors: [
    {
      code: 'UUID_EXPIRED',
      message: 'Activation code has been expired',
    },
  ],
};

export const Default = () => (
  <PasswordRecoveryModal
    loading={boolean('Loading', false)}
    show={boolean('Show', true)}
    onPasswordRecovery={action('onPasswordRecovery')}
  />
);

export const withError = () => (
  <PasswordRecoveryModal
    loading={boolean('Loading', false)}
    show={boolean('Show', true)}
    onPasswordRecovery={action('onPasswordRecovery')}
    errors={data.errors}
  />
);
