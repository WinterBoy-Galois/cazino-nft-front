import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';

export default {
  title: 'UI/Forms',
  component: PasswordInput,
  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ padding: '1rem' }}>{storyFn()}</div>,
  ],
  parameters: {
    backgrounds: [
      { name: 'Primary', value: '#091b33' },
      { name: 'Secondary', value: '#2d4560', default: true },
    ],
  },
};

const textData = {
  label: 'Username',
  value: 'sergioalvarez',
  onChangeValue: action('onChangeValue'),
};

const passwordData = {
  label: 'Password',
  value: 'Password123',
  onChangeValue: action('onChangeValue'),
};

export const Default = () => (
  <div>
    <TextInput {...textData} />
    <PasswordInput {...passwordData} />
  </div>
);
