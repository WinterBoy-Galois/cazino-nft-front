import { renderHook, act } from '@testing-library/react-hooks';
import { useBetGenerator } from './useBetGenerator.hook';

describe('useBetGenerator hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should instantiate without errors', () => {
    // Arrange
    const { result } = renderHook(() => useBetGenerator({}));

    // Act

    // Assert
    expect(result.current).not.toBeNull();
  });

  it("shouldn't generate bets", () => {
    // Arrange
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useBetGenerator({ isActive: false, onBetsGenerated: mockCallback })
    );

    // Act

    // Assert
    expect(result.current).not.toBeNull();
    expect(mockCallback).not.toBeCalled();

    jest.runOnlyPendingTimers();
    expect(mockCallback).not.toBeCalled();
  });

  it('should generate 1 bet per batch', () => {
    // Arrange
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useBetGenerator({ isActive: true, onBetsGenerated: mockCallback })
    );

    // Act

    // Assert
    expect(result.current).not.toBeNull();
    expect(mockCallback).not.toBeCalled();
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(mockCallback).toBeCalled();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0][0]).toHaveLength(1);
  });

  it('should generate 10 bets per batch', () => {
    // Arrange
    const mockCallback = jest.fn();
    const { result } = renderHook(() =>
      useBetGenerator({ isActive: true, betsPerBatch: 10, onBetsGenerated: mockCallback })
    );

    // Act

    // Assert
    expect(result.current).not.toBeNull();
    expect(mockCallback).not.toBeCalled();
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(mockCallback).toBeCalled();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0][0]).toHaveLength(10);
  });
});
