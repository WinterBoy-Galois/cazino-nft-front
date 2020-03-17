import { dateFromEpoch, timeFromEpoch, datetimeFromEpoch } from './date.extensions';

describe('dateFromEpoch', () => {
  it('should return formatted date', () => {
    // Arrange
    const value = 1582093456676;

    // Act
    const actual = dateFromEpoch(value);

    // Assert
    const expected = '19.02.2020';

    expect(actual).toEqual(expected);
  });
});

describe('timeFromEpoch', () => {
  it('should return formatted time', () => {
    // Arrange
    const value = 1582093456676;

    // Act
    const actual = timeFromEpoch(value);

    // Assert
    const expected = '07:24:16';

    expect(actual).toEqual(expected);
  });
});

describe('datetimeFromEpoch', () => {
  it('should return formatted datetime', () => {
    // Arrange
    const value = 1582093456676;

    // Act
    const actual = datetimeFromEpoch(value);

    // Assert
    const expected = '19.02.2020 07:24:16';

    expect(actual).toEqual(expected);
  });
});
