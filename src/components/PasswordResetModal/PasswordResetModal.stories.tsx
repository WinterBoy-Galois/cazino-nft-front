import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import PasswordResetModal from '.';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'Components/PasswordResetModal',
  component: PasswordResetModal,
  decorators: [withA11y],
};

export const Default = () => (
  <PasswordResetModal
    loading={boolean('Loading', false)}
    show={boolean('Show', true)}
    onPasswordReset={action('onPasswordReset')}
  />
);
