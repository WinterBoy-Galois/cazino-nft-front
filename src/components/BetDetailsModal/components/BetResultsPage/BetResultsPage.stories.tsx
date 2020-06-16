import React from 'react';
import { storiesOf } from '@storybook/react';
import BetResultsPage from '.';
import { GameTypes } from '../../../../models/gameTypes.model';
import { withKnobs, number, boolean, array } from '@storybook/addon-knobs';

storiesOf('Components/BetDetailsModal/BetResultsPage', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => (
    <div style={{ padding: '1rem 2rem', backgroundColor: '#2d4560', minHeight: '100vh' }}>
      {storyFn()}
    </div>
  ))
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
          mineCount: number('Mines', 24, { range: true, min: 12, max: 64, step: 1 }),
          minePositions: array('Mine positions', ['3', '7', '9', '15']).map(p => parseInt(p)),
          open: array('Opened fields', ['4', '5', '8', '15', '20']).map(p => parseInt(p)),
        },
      }}
    />
  ));
