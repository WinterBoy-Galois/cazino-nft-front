import {
  formatBet,
  formatMultiplier,
  formatProfit,
  formatBitcoin,
  formatBitcoinSmart,
} from './format.util';

describe('formatBitcoin', () => {
  it('should return valid format', () => {
    // Arrange
    const value = 0.0425;

    // Act
    const actual = formatBitcoin(value);

    // Assert
    const expected = '0.04250000';

    expect(actual).toEqual(expected);
  });

  it('should return n/a for null', () => {
    // Arrange
    const value = null;

    // Act
    const actual = formatBitcoin((value as unknown) as number);

    // Assert
    const expected = 'n/a';

    expect(actual).toEqual(expected);
  });
});

describe('formatBitcoinSmart', () => {
  it('should return valid format', () => {
    // Arrange
    const value = '425';

    // Act
    const actual = formatBitcoinSmart(value);

    // Assert
    const expected = '0.42500000';

    expect(actual).toEqual(expected);
  });
  it('should return valid format', () => {
    // Arrange
    const value = '0.425';

    // Act
    const actual = formatBitcoinSmart(value);

    // Assert
    const expected = '0.42500000';

    expect(actual).toEqual(expected);
  });
});

describe('formatBet', () => {
  it('should return valid format', () => {
    // Arrange
    const value = 0.425;

    // Act
    const actual = formatBet(value);

    // Assert
    const expected = '0.42500000';

    expect(actual).toEqual(expected);
  });
});

describe('formatMultiplier', () => {
  it('should return valid format', () => {
    // Arrange
    const value = 0.75;

    // Act
    const actual = formatMultiplier(value);

    // Assert
    const expected = 'x0.7500';

    expect(actual).toEqual(expected);
  });
});

describe('formatProfit', () => {
  it('should return valid positive format', () => {
    // Arrange
    const value = 0.581;

    // Act
    const actual = formatProfit(value);

    // Assert
    const expected = '+0.58100000';

    expect(actual).toEqual(expected);
  });

  it('should return valid negative format', () => {
    // Arrange
    const value = -0.13;

    // Act
    const actual = formatProfit(value);

    // Assert
    const expected = '-0.13000000';

    expect(actual).toEqual(expected);
  });
});
