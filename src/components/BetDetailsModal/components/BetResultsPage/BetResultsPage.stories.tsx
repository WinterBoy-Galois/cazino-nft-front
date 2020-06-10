import React from 'react';
import { storiesOf } from '@storybook/react';
import BetResultsPage from '.';
import { GameTypes } from '../../../../models/gameTypes.model';

storiesOf('Components/BetDetailsModal/BetResultsPage', module)
  .addDecorator(storyFn => <div style={{ padding: '1rem 2rem' }}>{storyFn()}</div>)
  .add('win', () => <BetResultsPage result={32.05} rollOver={45} gameType={GameTypes.DICE} />)
  .add('loss', () => <BetResultsPage result={67.23} rollOver={35} gameType={GameTypes.DICE} />);
