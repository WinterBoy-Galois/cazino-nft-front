import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

import TextInput from '.';

export default {
  title: 'Components/Forms/TextInput',
  component: TextInput,
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
  label: 'Username',
  value: 'sergioalvarez',
  validationMessage: 'Username already exists',
  onChangeValue: action('onChangeValue'),
};

export const Default = () => <TextInput {...data} validationMessage={undefined} />;

export const ValidationError = () => <TextInput {...data} />;

export const Custom = () => (
  <TextInput
    label={text('Label', data.label)}
    value={text('Value', data.value)}
    validationMessage={text('Validation', data.validationMessage)}
  />
);
