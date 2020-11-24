import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Avatar from '.';
import { appConfig } from '../../common/config';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ padding: '1rem' }}>{storyFn()}</div>,
  ],
};

const data = {
  url: `${appConfig.apiBasePath}/ava/m1.svg`,
  isEditable: true,
};

export const Default = () => <Avatar avatarUrl={data.url} />;

export const Editable = () => <Avatar avatarUrl={data.url} isEditable={true} />;

export const Clickable = () => <Avatar avatarUrl={data.url} onClick={action('onClick')} />;

export const Custom = () => (
  <Avatar
    avatarUrl={text('Avatar Url', data.url)}
    isEditable={boolean('Is editable', data.isEditable)}
  />
);
