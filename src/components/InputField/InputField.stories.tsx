import React from 'react';
import { action } from '@storybook/addon-actions';

import InputField from '.';

export default {
  title: 'Components/InputField',
  component: InputField,
};

const data = {
  label: 'Username',
  value: 'sergioalvarez',
  onChangeValue: action('onChangeValue'),
};

export const Default = () => <InputField {...data} />;
