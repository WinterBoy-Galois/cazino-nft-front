import React from 'react';
import UserInfo from '.';
import { LocationProvider } from '@reach/router';

export default {
  title: 'Components/Profile/UserInfo',
  component: UserInfo,
  decorators: [
    (storyFn: () => React.ReactNode) => <LocationProvider>{storyFn()}</LocationProvider>,
  ],
};

const data = {
  user: {
    id: '',
    username: 'name',
    avatarUrl: 'https://staging.jinglebets.com/ava/m6.svg',
    isActivated: true,
    email: 'test@test.de',
  },
};

export const Default = () => <UserInfo user={data.user} />;
export const WithPadding = () => (
  <div style={{ padding: '15px' }}>
    <UserInfo user={data.user} />
  </div>
);