import React from 'react';

import AccountActivationModal from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/AccountActivationModal',
  component: AccountActivationModal,
};

const data = {
  show: true,
  loading: false,
  errors: [
    {
      code: 'INVALID_ACTIVATION_CODE',
      message: 'Invalid activation code',
      source: 'code',
      args: undefined,
    },
  ],
};

export const Default = () => (
  <AccountActivationModal
    show={data.show}
    loading={data.loading}
    onResendEmail={action('resendEmail')}
    onActivateUser={action('activateUser')}
  />
);
export const withError = () => (
  <AccountActivationModal show={data.show} loading={data.loading} errors={data.errors} />
);
