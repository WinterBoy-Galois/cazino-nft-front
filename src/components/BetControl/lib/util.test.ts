import { isValid } from './util';

describe('util', () => {
  describe('isValid', () => {
    describe('for min = 1 and max = 10', () => {
      const min = 1;
      const max = 10;

      it('should return true for 10', () => {
        // Act
        // Assert
        expect(isValid('1', min, max)).toEqual(true);
      });

      it('should return true', () => {
        // Act
        // Assert
        expect(isValid('10', min, max)).toEqual(true);
      });

      it('should return false', () => {
        // Act
        // Assert
        expect(isValid('test', min, max)).toEqual(false);
      });

      it('should return false', () => {
        // Act
        // Assert
        expect(isValid('11', min, max)).toEqual(false);
      });

      it('should return false', () => {
        // Act
        // Assert
        expect(isValid('0', min, max)).toEqual(false);
      });

      it('should return false', () => {
        // Act
        // Assert
        expect(isValid('100a')).toEqual(false);
      });

      it('should return false', () => {
        // Act
        // Assert
        expect(isValid('')).toEqual(false);
      });

      it('should return false', () => {
        // Act
        // Assert
        expect(isValid('-5', min)).toEqual(false);
      });
    });
  });
});
