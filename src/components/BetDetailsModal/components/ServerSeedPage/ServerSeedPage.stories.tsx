import React from 'react';
import { storiesOf } from '@storybook/react';
import ServerSeedPage from '.';
import PageableModal from '../../../PageableModal';
import { withKnobs, text, array, select } from '@storybook/addon-knobs';
import { GameTypes } from '../../../../models/gameTypes.model';
import { action } from '@storybook/addon-actions';

storiesOf('Components/BetDetailsModal/ServerSeedPage', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <PageableModal show={true} pages={[storyFn()]} />)
  .add('Own bet', () => (
    <ServerSeedPage
      loading={false}
      ownDetails={{
        __typename: '',
        clientSeed: text('Client seed', 'asdf'),
        nonce: text('Nonce', 'asdf'),
        results: array('Results', ['5.34']),
        serverSeed: text('Server seed', 'asdfsadf'),
        serverSeedHash: text(
          'Server seed hash',
          'aa580a0ed83b7e4d102b8eaa3a17543d472efb7001ab38044d81e5b4ae3b764b'
        ),
        verificationUrl: text('Verification Url', 'asdf'),
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
      loading={false}
      otherDetails={{
        __typename: '',
        serverSeedHash: text(
          'Server seed hash',
          'aa580a0ed83b7e4d102b8eaa3a17543d472efb7001ab38044d81e5b4ae3b764b'
        ),
      }}
    />
  ));
