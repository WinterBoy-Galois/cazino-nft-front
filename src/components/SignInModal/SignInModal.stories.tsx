import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import SignInModal from '.';
import ApplicationError from '../../models/applicationError.model';

const data: ApplicationError = {
  code: 'AUTH_ERROR',
  message: 'Authentication error',
};

export default {
  title: 'Components/SignInModal',
  component: SignInModal,
  decorators: [withA11y],
};

export const Default = () => (
  <SignInModal
    show={boolean('Show', true)}
    loading={boolean('Loading', false)}
    errors={undefined}
    onClose={action('close modal')}
  />
);

export const WithErrorSummary = () => (
  <SignInModal
    show={boolean('Show', true)}
    loading={boolean('Loading', false)}
    errors={[data]}
    onClose={action('close modal')}
  />
);
