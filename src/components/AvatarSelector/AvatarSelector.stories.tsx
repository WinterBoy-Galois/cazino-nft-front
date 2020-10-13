import React from 'react';
import { action } from '@storybook/addon-actions';

import AvatarSelector from '.';

import { appConfig } from '../../common/config';

export default {
  title: 'Components/AvatarSelector',
  component: AvatarSelector,
  decorators: [
    (storyFn: () => React.ReactNode) => <div style={{ padding: '1rem' }}>{storyFn()}</div>,
  ],
};

const data = {
  urls: appConfig.avatarUrls,
};

export const Default = () => (
  <AvatarSelector avatarUrls={data.urls} onAvatarChange={action('onAvatarChange')} />
);
