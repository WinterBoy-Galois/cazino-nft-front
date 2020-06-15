import React from 'react';
import { storiesOf } from '@storybook/react';
import BetResultsPage from '.';
import { GameTypes } from '../../../../models/gameTypes.model';

storiesOf('Components/BetDetailsModal/BetResultsPage', module)
  .addDecorator(storyFn => (
    <div style={{ padding: '1rem 2rem', backgroundColor: '#2d4560', height: '100vh' }}>
      {storyFn()}
    </div>
  ))
  .add('win', () => (
    <BetResultsPage
      gameType={GameTypes.DICE}
      loading={false}
      betDetails={{
        bet: 0.00006874,
        profit: 0.0000312,
        profitCut: false,
        multiplier: 1.4539,
        gameResult: {
          target: 68.09369753713791,
          over: false,
          winChance: 68.09369753713791,
          resultFloat: 65.66,
        },
      }}
    />
  ))
  .add('loss', () => (
    <BetResultsPage
      gameType={GameTypes.DICE}
      loading={false}
      betDetails={{
        bet: 0.00006874,
        profit: 0.0000312,
        profitCut: false,
        multiplier: 1.4539,
        gameResult: {
          target: 68.09369753713791,
          over: true,
          winChance: 68.09369753713791,
          resultFloat: 85.66,
        },
      }}
    />
  ));
