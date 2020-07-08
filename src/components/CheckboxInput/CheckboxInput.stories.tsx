import React from 'react';
import { text } from '@storybook/addon-knobs';

import CheckboxInput from '.';

export default {
  title: 'Components/CheckboxInput',
  component: CheckboxInput,
};

const data = {
  label: 'Remember me',
};

export const Default = () => <CheckboxInput label={text('Label', data.label)} />;
