import React from 'react';
import { render, within } from '@testing-library/react';

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
    localizedMessage: 'Falsches Passwort',
  },
];

describe('ErrorSummary', () => {
  describe('for single error', () => {
    it('should match snapshot', () => {
      // Arrange
      const values = data;

      // Act
      const container = render(<ErrorSummary errors={values} showGeneralErrorsOnly={false} />);

      // Assert
      expect(container).toMatchSnapshot();
    });

    it('should not display as a list', () => {
      // Arrange
      const value = data[0];

      // Act
      const { getByText } = render(<ErrorSummary errors={[value]} showGeneralErrorsOnly={false} />);
      const element = getByText('Authentication error');

      // Assert
      expect(element).toMatchInlineSnapshot(`
        <div
          class="wrapper border"
        >
          Authentication error
        </div>
      `);
    });

    it('should show localized message if available', () => {
      // Arrange
      const value: ApplicationError = { ...data[0], localizedMessage: 'Anmeldungsfehler' };

      // Act
      const { getByText } = render(<ErrorSummary errors={[value]} showGeneralErrorsOnly={false} />);
      const element = getByText('Anmeldungsfehler');

      // Assert
      expect(element).toMatchInlineSnapshot(`
        <div
          class="wrapper border"
        >
          Anmeldungsfehler
        </div>
      `);
    });
  });

  describe('for multiple errors', () => {
    it('should match snapshot', () => {
      // Arrange
      const values = data;

      // Act
      const container = render(<ErrorSummary errors={values} showGeneralErrorsOnly={false} />);

      // Assert
      expect(container).toMatchSnapshot();
    });

    it('should display as a list', () => {
      // Arrange
      const value = data[0];

      // Act
      const { getAllByRole } = render(
        <ErrorSummary errors={[value, value]} showGeneralErrorsOnly={false} />
      );
      const listItems = getAllByRole('listitem');

      // Assert
      expect(listItems).toHaveLength(2);
    });

    it('should show localized message if available', async () => {
      // Arrange
      const values: ApplicationError[] = data;

      // Act
      const { getAllByRole } = render(
        <ErrorSummary errors={values} showGeneralErrorsOnly={false} />
      );
      const listItems = getAllByRole('listitem');

      // Assert
      listItems.forEach((item, index) => {
        const { getByText } = within(item);
        const { message, localizedMessage } = values[index];
        if (localizedMessage) {
          expect(getByText(localizedMessage)).toBeInTheDocument();
        } else {
          expect(getByText(message)).toBeInTheDocument();
        }
      });
    });
  });

  describe('for general errors only', () => {
    it('should remove all errors with a source', () => {
      // Arrange
      const values = data;

      // Act
      const { getByText } = render(<ErrorSummary errors={values} />);
      const element = getByText('Authentication error');

      // Assert
      expect(element).toMatchInlineSnapshot(`
        <div
          class="wrapper border"
        >
          Authentication error
        </div>
      `);
    });
  });
});
