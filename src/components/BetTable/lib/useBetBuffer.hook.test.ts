import { renderHook, act } from '@testing-library/react-hooks';

import { useBetBuffer } from './useBetBuffer.hook';
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
});
