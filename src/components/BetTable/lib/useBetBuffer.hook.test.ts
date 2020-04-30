import { useBetBuffer } from './useBetBuffer.hook';

describe('useBetBuffer hook', () => {
  it('should instantiate without errors', () => {
    // Arrange

    // Act
    const { addBets } = useBetBuffer();

    // Assert
    expect(addBets).toBeInstanceOf(Function);
  });
});
