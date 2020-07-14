import React from 'react';
import { text } from '@storybook/addon-knobs';

import Avatar from '.';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

const data = {
  url: 'https://dev.gambilife.com/ava/m1.svg',
};

export const Default = () => <Avatar avatarUrl={text('Avatar Url', data.url)} />;
