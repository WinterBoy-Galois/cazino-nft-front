import React from 'react';
import { text } from '@storybook/addon-knobs';

import ErrorSummary from '.';

export default {
  title: 'Components/ErrorSummary',
  component: ErrorSummary,
  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ padding: '1rem' }}>{storyFn()}</div>,
  ],
};

const data = {
  message: 'Your email or password is wrong.',
};

export const Default = () => <ErrorSummary message={text('Message', data.message)} />;
