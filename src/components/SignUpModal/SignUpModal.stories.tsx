import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import SignUpModal from '.';
import ApplicationError from '../../models/applicationError.model';

const data: ApplicationError = {
  code: 'AUTH_ERROR',
  message: 'Authentication error',
};

export default {
  title: 'Components/SignUpModal',
  component: SignUpModal,
  decorators: [withA11y],
};

export const Default = () => (
  <SignUpModal
    show={true}
    loading={boolean('Loading', false)}
    errors={undefined}
    onClose={action('close modal')}
  />
);

export const WithErrorSummary = () => (
  <SignUpModal
    show={true}
    loading={boolean('Loading', false)}
    errors={[data]}
    onClose={action('close modal')}
  />
);
