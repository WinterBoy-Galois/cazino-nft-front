import React from 'react';
import { storiesOf } from '@storybook/react';
import BetDetailsPage from '.';
import { GameTypes } from '../../../../models/gameTypes.model';
import PageableModal from '../../../PageableModal';

storiesOf('Components/BetDetailsModal/BetDetailsPage', module)
  .addDecorator(storyFn => <PageableModal show={true} pages={[storyFn()]} />)
  .add('default', () => (
    <BetDetailsPage
      bet={{
        id: '278192',
        username: 'gutierrezbrian',
        time: 1591032136876,
        userid: 67,
        gameid: GameTypes.MINES,
        bet: 0.00009425,
        profit: 0.00002852,
        multiplier: 1.3026315789473684,
      }}
      avatarUrl={'https://dev.gambilife.com/ava/m1.svg'}
      loading={false}
    />
  ));