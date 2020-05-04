import { renderHook, act } from '@testing-library/react-hooks';

import { useBetBuffer } from './useBetBuffer.hook';
import Bet from '../../../models/bet';

describe('useBetBuffer hook', () => {
  it('should instantiate without errors', () => {
    // Arrange
    const { result } = renderHook(() => useBetBuffer());

    // Act

    // Assert
    expect(result.current.addBets).toBeInstanceOf(Function);
  });

  it('should accept new bets via function', () => {
    // Arrange
    const { result } = renderHook(() => useBetBuffer());
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
});
