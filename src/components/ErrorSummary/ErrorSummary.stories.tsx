import React from 'react';
import { object, boolean } from '@storybook/addon-knobs';

import ErrorSummary from '.';
import ApplicationError from '../../models/applicationError.model';

const data: ApplicationError[] = [
  {
    code: 'AUTH_ERROR',
    message: 'Authentication error',
  },
  {
    source: 'email',
    code: 'NOT_VALID_EMAIL',
    message: 'Not a valid e-mail',
  },
  {
    source: 'password',
    code: 'INVALID_PASSWORD',
    message: 'Invalid password',
  },
];

export default {
  title: 'Components/ErrorSummary',
  component: ErrorSummary,
  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ padding: '1rem' }}>{storyFn()}</div>,
  ],
};

export const Default = () => <ErrorSummary errors={[data[0]]} />;
export const Multiple = () => <ErrorSummary errors={data} showGeneralErrorsOnly={false} />;
export const WithoutBorder = () => <ErrorSummary errors={[data[0]]} showBorder={false} />;
export const Custom = () => (
  <ErrorSummary
    showBorder={boolean('Show Border', true)}
    showGeneralErrorsOnly={boolean('General Errors only', false)}
    errors={object('Errors', data)}
  />
);
