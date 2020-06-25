import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ChangeServerSeedConfirmationModal from '.';

storiesOf('Components/UserInfoModal', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <ChangeServerSeedConfirmationModal
        show={true}
        onConfirm={action('Confirm')}
        onCancel={action('Cancel')}
      />
    );
  });
