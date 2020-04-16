import { isPositive, isNegative } from './sign.util';

describe('isPositive', () => {
  it('should return true on string that starts with +', () => {
    // Arrange
    const value = '+0.04885313';

    // Act
    const actual = isPositive(value);

    // Assert
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it("should return false on string that doesn't start with +", () => {
    // Arrange
    const value = '0.04885313';

    // Act
    const actual = isPositive(value);

    // Assert
    const expected = false;

    expect(actual).toEqual(expected);
  });
});

describe('isNegative', () => {
  it('should return true on string that starts with -', () => {
    // Arrange
    const value = '-0.04885313';

    // Act
    const actual = isNegative(value);

    // Assert
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it("should return false on string that doesn't start with -", () => {
    // Arrange
    const value = '0.04885313';

    // Act
    const actual = isNegative(value);

    // Assert
    const expected = false;

    expect(actual).toEqual(expected);
  });
});
