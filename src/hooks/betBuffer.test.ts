import { addToArray, countCurrentUserBets } from './betBuffer';
import Bet from '../models/bet.model';
import { GameTypes } from '../models/gameTypes.model';

describe('addToArray', () => {
  it('should add all elements to buffer', () => {
    // Arrange
    const values: Bet[] = [
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
    const actual = addToArray([], values);

    // Assert
    const expected = values;

    expect(actual).toEqual(expected);
  });
});

describe('countCurrentUserBets', () => {
  it('should return 0', () => {
    // Arrange
    const values: Bet[] = [
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
    const actual = countCurrentUserBets(values, 27);

    // Assert
    const expected = 0;

    expect(actual).toEqual(expected);
  });

  it('should return 2', () => {
    // Arrange
    const values: Bet[] = [
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
    ];

    // Act
    const actual = countCurrentUserBets(values, 121);

    // Assert
    const expected = 2;

    expect(actual).toEqual(expected);
  });
});
