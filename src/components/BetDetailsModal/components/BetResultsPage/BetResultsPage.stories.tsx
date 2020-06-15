import React from 'react';
import { storiesOf } from '@storybook/react';
import BetResultsPage from '.';
import { GameTypes } from '../../../../models/gameTypes.model';

storiesOf('Components/BetDetailsModal/BetResultsPage', module)
  .addDecorator(storyFn => <div style={{ padding: '1rem 2rem' }}>{storyFn()}</div>)
  .add('win', () => <BetResultsPage gameType={GameTypes.DICE} loading={false} />)
  .add('loss', () => <BetResultsPage gameType={GameTypes.DICE} loading={false} />);
