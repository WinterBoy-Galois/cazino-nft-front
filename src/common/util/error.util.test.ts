import { cleanup } from '@testing-library/react';
import { GraphQLError } from 'graphql';

import { getFromGraphQLErrors, getFromGenericErrors, getMessageFromCode } from './error.util';
import { GenericError } from '../../models/genericError.model';

const translate = (key: string) => {
  switch (key) {
    case 'errors.AUTH_ERROR':
      return 'Authentication error';
    default:
      return 'Unknown server error - administrators are notified';
  }
};

describe('ErrorUtil', () => {
  let mockedTranslation: jest.Mock;

  beforeEach(() => {
    cleanup();

    mockedTranslation = jest.fn(translate);
  });

  describe('for GraphQLErrors', () => {
    it('should return 0 for an empty array', () => {
      // Arrange
      const value: GraphQLError[] = [];

      // Act
      const actual = getFromGraphQLErrors(value);

      // Assert
      const expected = 0;

      expect(actual).toHaveLength(expected);
    });
  });

  describe('for GenericErrors', () => {
    it('should return 0 for an undefined value', () => {
      // Arrange
      const value: GenericError[] = [];

      // Act
      const actual = getFromGenericErrors(value);

      // Assert
      const expected = 0;

      expect(actual).toHaveLength(expected);
    });

    it('should return a localized message for code', () => {
      // Arrange
      const value = 'AUTH_ERROR';

      // Act
      const actual = getMessageFromCode(mockedTranslation, value);

      // Assert
      const expected = 'Authentication error';

      expect(actual).toEqual(expected);
    });

    it('should return a general message for unknown code', () => {
      // Arrange
      const value = 'THIS_IS_NO_REAL_ERROR_CODE';

      // Act
      const actual = getMessageFromCode(mockedTranslation, value);

      // Assert
      const expected = 'Unknown server error - administrators are notified';

      expect(actual).toEqual(expected);
    });
  });
});
