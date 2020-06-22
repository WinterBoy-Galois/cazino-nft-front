import React from 'react';
import { storiesOf } from '@storybook/react';
import ConfirmationModal from '.';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

storiesOf('Components/ConfirmationModal', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <ConfirmationModal
      show={true}
      text={text('Question', 'Are you sure that you want to change the server seed?')}
      onConfirmed={action('confirmed')}
      onCancelled={action('cancelled')}
    />
  ));
