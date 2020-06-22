import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '.';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { ButtonSize } from './lib/size';

storiesOf('Components/CopyField', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Button
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
    </Button>
  ));
