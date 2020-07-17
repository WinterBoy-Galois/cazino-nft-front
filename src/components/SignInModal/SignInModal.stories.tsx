import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import SignInModal from '.';

const data = {
  genericError: {
    source: null,
    code: 'AUTH_ERROR',
    message: 'Authentication error',
    args: null,
  },
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
    errors={[data.genericError]}
    onClose={action('close modal')}
  />
);
