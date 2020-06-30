import React from 'react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import InputField from '.';

export default {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    backgrounds: [
      { name: 'Primary', value: '#091b33' },
      { name: 'Secondary', value: '#2d4560', default: true },
    ],
  },
};

const data = {
  label: text('Label', 'Username'),
  value: 'sergioalvarez',
  onChangeValue: action('onChangeValue'),
};

export const Default = () => (
  <InputField {...data} label={text('Label', 'Username')} value={text('Value', 'sergioalvarez')} />
);
