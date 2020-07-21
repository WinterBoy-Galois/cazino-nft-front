import React from 'react';
import { render } from '@testing-library/react';

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

describe('ErrorSummary', () => {
  describe('for single error', () => {
    it('should match snapshot', () => {
      // Arrange

      // Act
      const container = render(<ErrorSummary errors={data} />);

      // Assert
      expect(container).toMatchSnapshot();
    });
  });

  describe('for multiple errors', () => {
    it('should match snapshot', () => {
      // Arrange

      // Act
      const container = render(<ErrorSummary errors={data} showGeneralErrorsOnly={false} />);

      // Assert
      expect(container).toMatchSnapshot();
    });
  });
});
