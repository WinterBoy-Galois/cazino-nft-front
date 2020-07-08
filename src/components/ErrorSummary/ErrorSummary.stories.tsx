import React from 'react';
import { text } from '@storybook/addon-knobs';

import ErrorSummary from '.';

export default {
  title: 'Components/ErrorSummary',
  component: ErrorSummary,
};

const data = {
  message: 'Your email or password is wrong.',
};

export const Default = () => <ErrorSummary message={text('Message', data.message)} />;
