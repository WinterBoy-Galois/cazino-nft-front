import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import SignInModal from '.';

storiesOf('Components/SignInModal', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <SignInModal
        show={boolean('Show', true)}
        loading={boolean('Loading', true)}
        error={undefined}
        onClose={action('close modal')}
      />
    );
  });
