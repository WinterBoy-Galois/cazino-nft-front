import React from 'react';
import { number } from '@storybook/addon-knobs';

import CodeInput from '.';

export default {
  title: 'Components/CodeInput',
  component: CodeInput,
};

const data = {
  fields: 6,
};

export const Default = () => <CodeInput fields={number('Fields', data.fields)} />;
