import {
  calcMultiplier,
  calcProbability,
  calcTarget,
  calcTargetMax,
  calcTargetMin,
} from './betCalc.util';

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

  describe('calcProbability', () => {
    it('should calculate probability with under', () => {
      // Arrange
      const target = 60;
      const over = false;

      // Act
      const actual = calcProbability(target, over);

      // Assert
      const expected = 60;

      expect(actual).toEqual(expected);
    });

    it('should calculate probability with over', () => {
      // Arrange
      const target = 60;
      const over = true;

      // Act
      const actual = calcProbability(target, over);

      // Assert
      const expected = 40;

      expect(actual).toEqual(expected);
    });
  });

  describe('calcMultiplier', () => {
    it('should calculate mulitplier', () => {
      // Arrange
      const prob = 69.24;
      const he = 0.01;

      // Act
      const actual = calcMultiplier(prob, he);

      // Assert
      const expected = 1.4298093587521665;

      expect(actual).toEqual(expected);
    });
  });

  describe('calcTarget', () => {
    it('should calculate target with over', () => {
      // Arrange
      const prob = 69;
      const over = true;

      // Act
      const actual = calcTarget(prob, over);

      // Assert
      const expected = 31;

      expect(actual).toEqual(expected);
    });

    it('should calculate target with under', () => {
      // Arrange
      const prob = 69;
      const over = false;

      // Act
      const actual = calcTarget(prob, over);

      // Assert
      const expected = 69;

      expect(actual).toEqual(expected);
    });
  });
});
