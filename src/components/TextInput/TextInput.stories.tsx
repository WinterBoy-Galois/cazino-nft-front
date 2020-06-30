import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

import TextInput from '.';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  decorators: [withKnobs],
  parameters: {
    backgrounds: [
      { name: 'Primary', value: '#091b33' },
      { name: 'Secondary', value: '#2d4560', default: true },
    ],
  },
};

const data = {
  label: 'Username',
  value: 'sergioalvarez',
  onChangeValue: action('onChangeValue'),
};

export const Default = () => (
  <TextInput label={text('Label', data.label)} value={text('Value', data.value)} />
);
