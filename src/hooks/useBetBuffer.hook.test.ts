import { renderHook, act } from '@testing-library/react-hooks';

import { useBetBuffer, DispatchSpeed } from './useBetBuffer.hook';
import Bet from '../models/bet.model';
import { GameTypes } from '../models/gameTypes.model';

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
        gameid: GameTypes.CLAMS,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
        multiplier: 0.123123,
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
        gameid: GameTypes.CLAMS,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
        multiplier: 0.123123,
      },
      {
        id: '1518',
        bet: 0.01855738,
        gameid: GameTypes.CLAMS,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
        multiplier: 0.123123,
      },
      {
        id: '1518',
        bet: 0.01855738,
        gameid: GameTypes.CLAMS,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
        multiplier: 0.123123,
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
        gameid: GameTypes.CLAMS,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
        multiplier: 0.123123,
      },
    ];

    // Act
    for (let _i = 0; _i < 5; _i++) {
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
        gameid: GameTypes.CLAMS,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
        multiplier: 0.123123,
      },
      {
        id: '1519',
        bet: 0.01855738,
        gameid: GameTypes.CLAMS,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 121,
        username: 'martinezmark',
        multiplier: 0.123123,
      },
      {
        id: '1520',
        bet: 0.01855738,
        gameid: GameTypes.CLAMS,
        profit: -0.01891901,
        time: 1588086626434,
        userid: 122,
        username: 'martinezmark',
        multiplier: 0.123123,
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
          gameid: GameTypes.DICE,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 121,
          username: 'martinezmark',
          multiplier: 0.123123,
        },
        {
          id: '1519',
          bet: 0.01855738,
          gameid: GameTypes.DICE,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 121,
          username: 'martinezmark',
          multiplier: 0.123123,
        },
        {
          id: '1520',
          bet: 0.01855738,
          gameid: GameTypes.DICE,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 122,
          username: 'martinezmark',
          multiplier: 0.123123,
        },
        {
          id: '1521',
          bet: 0.01855738,
          gameid: GameTypes.DICE,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 121,
          username: 'martinezmark',
          multiplier: 0.123123,
        },
        {
          id: '1522',
          bet: 0.01855738,
          gameid: GameTypes.DICE,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 122,
          username: 'martinezmark',
          multiplier: 0.123123,
        },
      ];

      // Act
      act(() => {
        result.current.addBets(newBets);
      });

      // Assert
      expect(result.current.bets.length).toEqual(5);
      expect(mockCallback).not.toBeCalled();
      expect(setInterval).toHaveBeenCalledTimes(1);

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

    it('should dispatch while adding new bets', () => {
      // Arrange
      const mockCallback = jest.fn();

      const { result } = renderHook(() =>
        useBetBuffer({
          bufferSize: 100,
          dispatchSpeed: DispatchSpeed.NORMAL,
          onBetDispatched: mockCallback,
        })
      );

      const newBets: Bet[] = [
        {
          id: '1518',
          bet: 0.01855738,
          gameid: GameTypes.DICE,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 121,
          username: 'martinezmark',
          multiplier: 0.123123,
        },
        {
          id: '1519',
          bet: 0.01855738,
          gameid: GameTypes.DICE,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 121,
          username: 'martinezmark',
          multiplier: 0.123123,
        },
        {
          id: '1520',
          bet: 0.01855738,
          gameid: GameTypes.DICE,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 122,
          username: 'martinezmark',
          multiplier: 0.123123,
        },
        {
          id: '1521',
          bet: 0.01855738,
          gameid: GameTypes.DICE,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 121,
          username: 'martinezmark',
          multiplier: 0.123123,
        },
        {
          id: '1522',
          bet: 0.01855738,
          gameid: GameTypes.DICE,
          profit: -0.01891901,
          time: 1588086626434,
          userid: 122,
          username: 'martinezmark',
          multiplier: 0.123123,
        },
      ];

      // Act
      act(() => {
        result.current.addBets(newBets);
      });

      // Assert
      expect(result.current.bets.length).toEqual(5);
      expect(mockCallback).not.toBeCalled();
      expect(setInterval).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(4);
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(mockCallback).toBeCalled();
      expect(mockCallback).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(3);
      expect(mockCallback).toHaveBeenCalledTimes(2);

      act(() => {
        result.current.addBets(newBets);
      });

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(7);
      expect(mockCallback).toHaveBeenCalledTimes(3);

      act(() => {
        result.current.addBets(newBets);
      });

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(11);
      expect(mockCallback).toHaveBeenCalledTimes(4);

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(10);
      expect(mockCallback).toHaveBeenCalledTimes(5);

      act(() => {
        result.current.addBets(newBets);
      });

      jest.runOnlyPendingTimers();
      expect(result.current.bets.length).toEqual(14);
      expect(mockCallback).toHaveBeenCalledTimes(6);
    });
  });
});
