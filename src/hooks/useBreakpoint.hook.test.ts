import { useBreakpoint } from './useBreakpoint.hook';

jest.mock('./useWindowDimensions.hook', () => ({
  useWindowDimensions: jest.fn().mockReturnValue({ width: 800 }),
}));

describe('useBreakpoint hook', () => {
  it('should return expected breakpoint name', () => {
    // Arrange

    // Act
    const b = useBreakpoint();

    // Assert
    expect(b).toBe('md');
  });
});
