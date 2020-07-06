import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SignUpModal from '.';

storiesOf('Components/SignUpModal', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <SignUpModal show={true} loading={false} errors={undefined} onClose={action('close modal')} />
    );
  });
