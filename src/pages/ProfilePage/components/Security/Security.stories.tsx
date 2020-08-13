import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import Security from '.';

export default {
  title: 'Components/Profile/Security',
  component: Security,
  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ minHeight: '200px' }}>{storyFn()}</div>,
  ],
};

const data = {
  errors: [
    {
      source: 'oldPassword',
      code: 'INVALID_PASSWORD',
      message: 'Invalid password',
    },
  ],
};

export const Default = () => <Security loading={boolean('Loading', false)} />;
export const withError = () => (
  <Security loading={boolean('Loading', false)} errors={data.errors} />
);
