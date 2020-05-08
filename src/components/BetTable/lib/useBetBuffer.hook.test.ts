import { renderHook, act } from '@testing-library/react-hooks';

import { useBetBuffer, DispatchSpeed } from './useBetBuffer.hook';
import Bet from '../../../models/bet';

describe('useBetBuffer hook', () => {
  it('should instantiate without errors', () => {
    // Arrange
    const { result } = renderHook(() => useBetBuffer({}));

    // Act

    // Assert
    expect(result.current.addBets).toBeInstanceOf(Function);
  });

  it('should accept new bets via function', () => {
    // Arrange
    const { result } = renderHook(() => useBetBuffer({}));
    const newBets: Bet[] = [
      {
        id: '1518',
        bet: 0.01855738,
        gameid: 1,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
      },
    ];

    // Act
    act(() => {
      result.current.addBets(newBets);
    });

    // Assert
    expect(result.current.bets.length).toEqual(1);
  });

  it('should limit bets added in bulk to buffer size', () => {
    // Arrange
    const { result } = renderHook(() => useBetBuffer({ bufferSize: 2 }));
    const newBets: Bet[] = [
      {
        id: '1518',
        bet: 0.01855738,
        gameid: 1,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
      },
      {
        id: '1518',
        bet: 0.01855738,
        gameid: 1,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
      },
      {
        id: '1518',
        bet: 0.01855738,
        gameid: 1,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
      },
    ];

    // Act
    act(() => {
      result.current.addBets(newBets);
    });

    // Assert
    expect(result.current.bets.length).toEqual(2);
  });

  it('should limit bets added sequentially to buffer size', () => {
    // Arrange
    const { result } = renderHook(() => useBetBuffer({ bufferSize: 3 }));

    const newBets: Bet[] = [
      {
        id: '1518',
        bet: 0.01855738,
        gameid: 1,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
      },
    ];

    // Act
    for (let _i: number = 0; _i < 5; _i++) {
      act(() => {
        result.current.addBets(newBets);
      });
    }

    // Assert
    expect(result.current.bets.length).toEqual(3);
  });

  it('should trigger onBetAddedForCurrentUser', () => {
    // Arrange
    const mockCallback = jest.fn();

    const { result } = renderHook(() =>
      useBetBuffer({
        bufferSize: 3,
        currentUserId: 121,
        onBetAddedForCurrentUser: mockCallback,
      })
    );

    const newBets: Bet[] = [
      {
        id: '1518',
        bet: 0.01855738,
        gameid: 1,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
      },
      {
        id: '1519',
        bet: 0.01855738,
        gameid: 1,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
      },
      {
        id: '1520',
        bet: 0.01855738,
        gameid: 1,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 122,
        username: 'martinezmark',
      },
    ];

    // Act
    act(() => {
      result.current.addBets(newBets);
    });

    // Assert
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  describe('dispatcher', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should dispatch 1 bet per second', () => {
      // Arrange
      const mockCallback = jest.fn();

      const { result } = renderHook(() =>
        useBetBuffer({
          bufferSize: 10,
          dispatchSpeed: DispatchSpeed.NORMAL,
          onBetDispatched: mockCallback,
        })
      );

      const newBets: Bet[] = [
        {
          id: '1518',
          bet: 0.01855738,
          gameid: 1,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 121,
          username: 'martinezmark',
        },
        {
          id: '1519',
          bet: 0.01855738,
          gameid: 1,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 121,
          username: 'martinezmark',
        },
        {
          id: '1520',
          bet: 0.01855738,
          gameid: 1,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 122,
          username: 'martinezmark',
        },
        {
          id: '1521',
          bet: 0.01855738,
          gameid: 1,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 121,
          username: 'martinezmark',
        },
        {
          id: '1522',
          bet: 0.01855738,
          gameid: 1,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 122,
          username: 'martinezmark',
        },
      ];

      // Act
      act(() => {
        result.current.addBets(newBets);
      });

      // Assert
      expect(result.current.bets.length).toEqual(5);
      expect(mockCallback).not.toBeCalled();
      expect(setInterval).toHaveBeenCalledTimes(2);

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(4);
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(mockCallback).toBeCalled();
      expect(mockCallback).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(3);
      expect(mockCallback).toHaveBeenCalledTimes(2);

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(2);
      expect(mockCallback).toHaveBeenCalledTimes(3);

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(1);
      expect(mockCallback).toHaveBeenCalledTimes(4);

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(0);
      expect(mockCallback).toHaveBeenCalledTimes(5);

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(0);
      expect(mockCallback).toHaveBeenCalledTimes(5);
    });
  });
});
