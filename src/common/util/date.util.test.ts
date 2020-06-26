import {
  dateFromEpoch,
  timeFromEpoch,
  datetimeFromEpoch,
  dateFromEpochShort,
  datetimeFromEpochShort,
  timeFromEpochShort,
} from './date.util';

describe('dateFromEpoch', () => {
  it('should return formatted date', () => {
    // Arrange
    const value = 1582093456676;

    // Act
    const actual = dateFromEpoch(value);

    // Assert
    const expected = '02/19/2020';

    expect(actual).toEqual(expected);
  });
});

describe('dateFromEpochShort', () => {
  it('should return formatted date', () => {
    // Arrange
    const value = 1582093456676;

    // Act
    const actual = dateFromEpochShort(value);

    // Assert
    const expected = '02/19/20';

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
    const expected = '06:24:16';

    expect(actual).toEqual(expected);
  });
});

describe('timeFromEpochShort', () => {
  it('should return formatted time', () => {
    // Arrange
    const value = 1582093456676;

    // Act
    const actual = timeFromEpochShort(value);

    // Assert
    const expected = '06:24';

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
    const expected = '02/19/2020 06:24:16';

    expect(actual).toEqual(expected);
  });
});

describe('datetimeFromEpochShort', () => {
  it('should return formatted datetime', () => {
    // Arrange
    const value = 1582093456676;

    // Act
    const actual = datetimeFromEpochShort(value);

    // Assert
    const expected = '02/19/20 06:24:16';

    expect(actual).toEqual(expected);
  });
});
