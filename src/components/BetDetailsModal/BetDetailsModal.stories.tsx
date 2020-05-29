import React from 'react';
import { storiesOf } from '@storybook/react';
import BetDetailsModal from '.';

storiesOf('Components/BetDetailsModal', module).add('default', () => (
  <BetDetailsModal show={true} />
));
