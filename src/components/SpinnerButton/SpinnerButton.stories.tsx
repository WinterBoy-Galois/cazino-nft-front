import React from 'react';
import { storiesOf } from '@storybook/react';
import SpinnerButton from '.';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { ButtonSize } from '../Button';

storiesOf('Components/buttons/SpinnerButton', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SpinnerButton
      onClick={action('button click')}
      size={select(
        'Size',
        {
          small: ButtonSize.SMALL,
          medium: ButtonSize.MEDIUM,
          large: ButtonSize.LARGE,
        },
        ButtonSize.SMALL
      )}
      color={select(
        'Color',
        {
          primary: 'PRIMARY',
          secondary: 'SECONDARY',
        },
        'PRIMARY'
      )}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)}
      loadingText={text('Loading text', 'Loading...')}
    >
      {text('Text', 'Click me')}
    </SpinnerButton>
  ));
