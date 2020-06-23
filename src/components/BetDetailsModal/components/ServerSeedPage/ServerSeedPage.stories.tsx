import React from 'react';
import { storiesOf } from '@storybook/react';
import ServerSeedPage from '.';
import PageableModal from '../../../PageableModal';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { GameTypes } from '../../../../models/gameTypes.model';

storiesOf('Components/BetDetailsModal/ServerSeedPage', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <PageableModal show={true} pages={[storyFn()]} />)
  .add('Own', () => (
    <ServerSeedPage
      loading={false}
      ownDetails={{
        __typename: '',
        clientSeed: text('Client seed', 'asdf'),
        nonce: text('Nonce', 'asdf'),
        results: array('Results', ['5.34']),
        serverSeed: text('Server seed', 'asdfsadf'),
        serverSeedHash: text('Server seed hash', 'asdf'),
        verificationUrl: text('Verification Url', 'asdf'),
      }}
    />
  ))
  .add('Other', () => (
    <ServerSeedPage
      loading={false}
      otherDetails={{ __typename: '', serverSeedHash: text('Server seed hash', 'asdf') }}
    />
  ))
  .add('Locked', () => (
    <ServerSeedPage
      loading={false}
      lockedDetails={{
        __typename: '',
        serverSeedHash: text('Server seed hash', 'asdf'),
        activeGames: [GameTypes.GOALS],
      }}
    />
  ));
