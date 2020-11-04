import { calcTargetMax, calcTargetMin } from './betCalc.util';

describe('betCalc', () => {
  describe('calcTargetMin', () => {
    it('should return target minimum for over', () => {
      // Arrange
      const minProb = 0.01;
      const maxProb = 98;
      const over = true;

      // Act
      const actual = calcTargetMin(minProb, maxProb, over);

      // Assert
      const expected = 2;

      expect(actual).toEqual(expected);
    });

    it('should return target minimum for under', () => {
      // Arrange
      const minProb = 0.01;
      const maxProb = 98;
      const over = false;

      // Act
      const actual = calcTargetMin(minProb, maxProb, over);

      // Assert
      const expected = 0.01;

      expect(actual).toEqual(expected);
    });
  });

  describe('calcTargetMax', () => {
    it('should return target maximum for over', () => {
      // Arrange
      const minProb = 0.01;
      const maxProb = 98;
      const over = true;

      // Act
      const actual = calcTargetMax(minProb, maxProb, over);

      // Assert
      const expected = 99.99;

      expect(actual).toEqual(expected);
    });

    it('should return target maximum for under', () => {
      // Arrange
      const minProb = 0.01;
      const maxProb = 98;
      const over = false;

      // Act
      const actual = calcTargetMax(minProb, maxProb, over);

      // Assert
      const expected = 98;

      expect(actual).toEqual(expected);
    });
  });
});
