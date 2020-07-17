import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import SignUpModal from '.';
import { GenericErrorType, GenericErrorSeverity } from '../../models/genericError.model';

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
    errors={[data.genericError]}
    onClose={action('close modal')}
  />
);
