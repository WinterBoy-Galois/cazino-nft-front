import { getGeneralErrors, getMessageFromCode } from './error.util';
import { GenericError } from '../../models/genericError.model';

describe('getGeneralErrors', () => {
  it('should return 0 for an empty array', () => {
    // Arrange
    const value: GenericError[] = [];

    // Act
    const actual = getGeneralErrors(value);

    // Assert
    const expected = 0;

    expect(actual).toHaveLength(expected);
  });

  it('should return 0 for an undefined value', () => {
    // Arrange
    const value: GenericError[] = [];

    // Act
    const actual = getGeneralErrors(value);

    // Assert
    const expected = 0;

    expect(actual).toHaveLength(expected);
  });

  it('should return only errors with no source', () => {
    // Arrange
    const value = [
      {
        source: null,
        code: 'AUTH_ERROR',
        message: 'Authentication error',
        args: null,
      },
      {
        source: 'email',
        code: 'NOT_VALID_EMAIL',
        message: 'Not a valid e-mail',
        args: null,
      },
      {
        source: 'password',
        code: 'INVALID_PASSWORD',
        message: 'Invalid password',
        args: null,
      },
    ];

    // Act
    const actual = getGeneralErrors(value);

    // Assert
    const expected = 1;

    expect(actual).toHaveLength(expected);
  });

  it('should return a localized message for code', () => {
    // Arrange
    const value = 'AUTH_ERROR';

    // Act
    const actual = getMessageFromCode(value);

    // Assert
    const expected = 'Invalid password';

    expect(actual).toEqual(expected);
  });

  it('should return a general message for unknown code', () => {
    // Arrange
    const value = 'THIS_IS_NO_REAL_ERROR_CODE';

    // Act
    const actual = getMessageFromCode(value);

    // Assert
    const expected = 'Unknown server error - administrators are notified';

    expect(actual).toEqual(expected);
  });
});
