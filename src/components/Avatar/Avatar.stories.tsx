import React from 'react';
import { text } from '@storybook/addon-knobs';

import Avatar from '.';

export default {
  title: 'Components/Avatar',
  component: Avatar,
};

const data = {
  url: 'Hello World!',
};

export const Default = () => <Avatar avatarUrl={text('Avatar Url', data.url)} />;
