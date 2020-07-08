import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
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

storiesOf('Components/SignUpModal', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <SignUpModal
        show={true}
        loading={boolean('Loading', false)}
        errors={undefined}
        onClose={action('close modal')}
      />
    );
  })
  .add('WithErrorSummary', () => {
    return (
      <SignUpModal
        show={true}
        loading={boolean('Loading', false)}
        errors={[data.genericError]}
        onClose={action('close modal')}
      />
    );
  });
