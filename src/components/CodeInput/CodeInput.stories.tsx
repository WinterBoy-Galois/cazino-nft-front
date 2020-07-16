import React from 'react';
import { number, boolean } from '@storybook/addon-knobs';
import CodeInput from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/CodeInput',
  component: CodeInput,
};

const data = {
  fields: 6,
  disabled: false,
};

export const Default = () => (
  <CodeInput
    fields={number('Fields', data.fields)}
    onComplete={action('onComplete')}
    disabled={boolean('Disabled', data.disabled)}
  />
);
