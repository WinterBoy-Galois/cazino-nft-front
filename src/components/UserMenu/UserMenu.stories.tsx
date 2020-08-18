import React from 'react';
import { text } from '@storybook/addon-knobs';

import UserMenu from '.';

export default {
  title: 'Components/UserMenu',
  component: UserMenu,
};

const data = {
  username: 'Username',
};

export const Default = () => <UserMenu username={text('Username', data.username)} />;
