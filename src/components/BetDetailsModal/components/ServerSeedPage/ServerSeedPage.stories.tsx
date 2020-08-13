import React from 'react';
import { storiesOf } from '@storybook/react';
import ServerSeedPage from '.';
import PageableModal from '../../../PageableModal';
import { withKnobs, text, array, select, boolean } from '@storybook/addon-knobs';
import { GameTypes } from '../../../../models/gameTypes.model';
import { action } from '@storybook/addon-actions';
import { LocationProvider } from '@reach/router';

storiesOf('Components/BetDetailsModal/ServerSeedPage', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <LocationProvider>{storyFn()}</LocationProvider>)
  .addDecorator(storyFn => <PageableModal show={true} pages={[storyFn()]} />)
  .add('Own bet', () => (
    <ServerSeedPage
      loading={boolean('Loading', false)}
      ownDetails={{
        __typename: '',
        clientSeed: text('Client seed', 'tick-tock-tick-tock-tick-tock'),
        nonce: text('Nonce', '32768'),
        results: array('Results', ['5.34', '7.78', '44.67', '37.78', '45.78', '2.7']),
        serverSeed: text(
          'Server seed',
          'aa580a0ed83b7e4d102b8eaa3a17543d472efb7001ab38044d81e5b4ae3b764b'
        ),
        serverSeedHash: text(
          'Server seed hash',
          'aa580a0ed83b7e4d102b8eaa3a17543d472efb7001ab38044d81e5b4ae3b764b'
        ),
        verificationUrl: text('Verification Url', 'https://repl.it/'),
        activeGames: select(
          'Active Games',
          {
            None: [],
            Goals: [GameTypes.GOALS],
            Mines: [GameTypes.MINES],
            Dice: [GameTypes.DICE],
            Clams: [GameTypes.CLAMS],
          },
          []
        ) as GameTypes[],
      }}
      onChangeServerSeed={action('change server seed')}
    />
  ))
  .add('Others bet', () => (
    <ServerSeedPage
      loading={boolean('Loading', false)}
      otherDetails={{
        __typename: '',
        serverSeedHash: text(
          'Server seed hash',
          'aa580a0ed83b7e4d102b8eaa3a17543d472efb7001ab38044d81e5b4ae3b764b'
        ),
      }}
    />
  ));
