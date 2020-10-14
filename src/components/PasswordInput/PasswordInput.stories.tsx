import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

import PasswordInput from '.';

export default {
  title: 'Components/Forms/PasswordInput',
  component: PasswordInput,
  decorators: [
    withKnobs,
    (storyFn: () => React.ReactNode) => <div style={{ padding: '1rem' }}>{storyFn()}</div>,
  ],
  parameters: {
    backgrounds: {
      default: 'Secondary',
    },
  },
};

const data = {
  label: 'Password',
  value: 'Password123',
  onChangeValue: action('onChangeValue'),
};

export const Default = () => (
  <PasswordInput {...data} label={text('Label', data.label)} value={text('Value', data.value)} />
);
