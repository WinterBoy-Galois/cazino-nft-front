import React from 'react';
import { storiesOf } from '@storybook/react';
import HollowButton from '.';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { ButtonSize } from '../Button';

storiesOf('Components/buttons/HollowButton', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <HollowButton
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
    >
      {text('Text', 'Click me')}
    </HollowButton>
  ));
