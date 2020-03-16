import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu from '.';

storiesOf('Components/BottomBar/Menu', module)
  .add('default', () => <Menu />)
  .add('unclaimed', () => <Menu hasUnclaimedBonus={true} />);
