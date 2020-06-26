import React from 'react';
import { storiesOf } from '@storybook/react';
import BetResultsPage from '.';
import { GameTypes } from '../../../../models/gameTypes.model';
import { withKnobs, number, boolean, array, select } from '@storybook/addon-knobs';
import { GoalsDifficulty } from '../../../../models/betDetails.model';
import PageableModal from '../../../PageableModal';

storiesOf('Components/BetDetailsModal/BetResultsPage', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <PageableModal show={true} pages={[storyFn()]} />)
  .add('Dice', () => (
    <BetResultsPage
      gameType={GameTypes.DICE}
      loading={false}
      betDetails={{
        bet: number('Bet', 0.00006874),
        profit: number('Profit', 0.0000312),
        profitCut: boolean('Profit cut', false),
        multiplier: number('Multiplier', 1.4539),
        gameResult: {
          target: number('Roll over', 68.09369753713791, {
            range: true,
            min: 0,
            max: 100,
            step: 0.01,
          }),
          over: boolean('Over', false),
          winChance: number('Win Chance', 68.09369753713791, {
            range: true,
            min: 0,
            max: 100,
            step: 0.1,
          }),
          resultFloat: number('Result', 65.66, { range: true, min: 0, max: 100, step: 0.01 }),
        },
      }}
    />
  ))
  .add('Mines', () => (
    <BetResultsPage
      gameType={GameTypes.MINES}
      loading={false}
      betDetails={{
        bet: number('Bet', 0.00006874),
        profit: number('Profit', 0.0000312),
        profitCut: boolean('Profit cut', false),
        multiplier: number('Multiplier', 1.4539),
        gameResult: {
          mineCount: 0,
          minePositions: array('Mine positions', ['3', '7', '9', '15']).map(p => parseInt(p)),
          open: array('Opened fields', ['4', '5', '8', '15', '20']).map(p => parseInt(p)),
        },
      }}
    />
  ))
  .add('Goals', () => (
    <BetResultsPage
      gameType={GameTypes.GOALS}
      loading={false}
      betDetails={{
        bet: number('Bet', 0.00006874),
        profit: number('Profit', 0.0000312),
        profitCut: boolean('Profit cut', false),
        multiplier: number('Multiplier', 1.4539),
        gameResult: {
          difficulty: select(
            'Difficulty',
            {
              OneOutOfTwo: GoalsDifficulty.GOALS1OUT2,
              TwoOutOfThree: GoalsDifficulty.GOALS2OUT3,
              OneOutOfThree: GoalsDifficulty.GOALS1OUT3,
            },
            GoalsDifficulty.GOALS1OUT2
          ),
          selections: [
            {
              step: number('Step 1', 0),
              luckySpots: array('Lucky Spots 1', ['1', '2']).map(p => parseInt(p)),
              selected: number('Selected 1', 2),
            },
            {
              step: number('Step 2', 1),
              luckySpots: array('Lucky Spots 2', ['0', '2']).map(p => parseInt(p)),
              selected: number('Selected 2', 0),
            },
            {
              step: number('Step 3', 2),
              luckySpots: array('Lucky Spots 3', ['0', '1']).map(p => parseInt(p)),
              selected: number('Selected 3', 2),
            },
            {
              step: number('Step 4', 3),
              luckySpots: array('Lucky Spots 4', ['0', '1']).map(p => parseInt(p)),
              selected: number('Selected 4', 2),
            },
          ],
        },
      }}
    />
  ))
  .add('Clams', () => (
    <BetResultsPage
      gameType={GameTypes.CLAMS}
      loading={false}
      betDetails={{
        bet: number('Bet', 0.00006874),
        profit: number('Profit', 0.0000312),
        profitCut: boolean('Profit cut', false),
        multiplier: number('Multiplier', 1.4539),
        gameResult: {
          selection: array('Selection', ['8', '6', '3', '1', '5']).map(p => parseInt(p)),
          resultInteger: number('Result', 1),
        },
      }}
    />
  ));
