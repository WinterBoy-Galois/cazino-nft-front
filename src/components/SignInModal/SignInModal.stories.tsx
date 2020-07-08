import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SignInModal from '.';
import { GenericErrorSeverity, GenericErrorType } from '../../models/genericError.model';

const data = {
  genericError: {
    type: GenericErrorType.FIELD,
    field: '',
    severity: GenericErrorSeverity.CRITICAL,
    messageKey: '',
    args: null,
  },
};

export default {
  title: 'Components/SignInModal',
  component: SignInModal,
};

export const Default = () => (
  <SignInModal
    show={boolean('Show', true)}
    loading={boolean('Loading', true)}
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
