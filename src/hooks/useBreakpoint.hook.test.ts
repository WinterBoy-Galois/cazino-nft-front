import { renderHook } from '@testing-library/react-hooks';
import { useBreakpoint } from './useBreakpoint.hook';

describe('useBreakpoint hook', () => {
  beforeAll(() => {
    jest.mock('./useWindowDimensions.hook', () => ({
      useWindowDimensions: jest.fn().mockReturnValue({ width: 1024 }),
    }));
  });

  it('should return expected breakpoint name', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useBreakpoint());

    // Assert
    expect(result.current).toBe('lg');
  });
});
