import React from 'react';
import { storiesOf } from '@storybook/react';
import BetResultsPage from '.';
import { GameTypes } from '../../../../models/gameTypes.model';
import { withKnobs, select, number, boolean, array } from '@storybook/addon-knobs';

storiesOf('Components/BetDetailsModal/BetResultsPage', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => (
    <div style={{ padding: '1rem 2rem', backgroundColor: '#2d4560', height: '100vh' }}>
      {storyFn()}
    </div>
  ))
  .add('Custom', () => (
    <BetResultsPage
      gameType={select(
        'Game Type',
        {
          Dice: GameTypes.DICE,
          Clam: GameTypes.CLAMS,
          Mines: GameTypes.MINES,
          Goals: GameTypes.GOALS,
        },
        GameTypes.DICE
      )}
      loading={false}
      betDetails={{
        bet: number('Bet', 0.00006874),
        profit: number('Profit', 0.0000312),
        profitCut: boolean('Profit cut', false),
        multiplier: number('Multiplier', 1.4539),
        gameResult: {
          target: number('Roll over', 68.09369753713791),
          over: boolean('Over', false),
          winChance: number('Win Chance', 68.09369753713791),
          resultFloat: number('Result', 65.66),
          mineCount: number('Mines', 24),
          minePositions: array('Mine positions', ['3', '7', '9', '15']).map(p => parseInt(p)),
          open: array('Opened fields', ['4', '5', '8', '15', '20']).map(p => parseInt(p)),
        },
      }}
    />
  ));
