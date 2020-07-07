import React from 'react';
import { text } from '@storybook/addon-knobs';

import ValidationSummary from '.';

export default {
  title: 'Components/ValidationSummary',
  component: ValidationSummary,
};

const data = {
  message: 'Your email or password is wrong.',
};

export const Default = () => <ValidationSummary message={text('Message', data.message)} />;
