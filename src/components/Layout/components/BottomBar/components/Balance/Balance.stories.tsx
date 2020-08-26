import React from 'react';
import { text } from '@storybook/addon-knobs';

import Balance from '.';

export default {
  title: 'Components/BottomBar/Balance',
  component: Balance,
};

export const Default = () => <Balance value="0.00000000" />;

export const Custom = () => <Balance value={text('Value', '0.00463242')} />;
