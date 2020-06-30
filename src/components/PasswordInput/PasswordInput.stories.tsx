import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

import PasswordInput from '.';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  decorators: [withKnobs],
  parameters: {
    backgrounds: [
      { name: 'Primary', value: '#091b33' },
      { name: 'Secondary', value: '#2d4560', default: true },
    ],
  },
};

const data = {
  label: 'Password',
  value: 'Password123',
  onChangeValue: action('onChangeValue'),
};

export const Default = () => (
  <PasswordInput label={text('Label', data.label)} value={text('Value', data.value)} />
);
