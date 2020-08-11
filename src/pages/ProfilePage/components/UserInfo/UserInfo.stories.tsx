import React from 'react';
import UserInfo from '.';
import { LocationProvider } from '@reach/router';

export default {
  title: 'Components/UserInfo',
  component: UserInfo,
  decorators: [
    (storyFn: () => React.ReactNode) => <LocationProvider>{storyFn()}</LocationProvider>,
  ],
};

const data = {
  user: {
    id: '',
    username: 'name',
    avatarUrl: '',
    isActivated: true,
    email: 'test@test.de',
  },
};

export const Default = () => <UserInfo user={data.user} />;
