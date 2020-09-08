import React from 'react';
import { LocationProvider } from '@reach/router';

import ChangeServerSeedConfirmationModal from '.';

export default {
  title: 'Components/ChangeServerSeedConfirmationModal',
  component: ChangeServerSeedConfirmationModal,
  decorators: [
    (storyFn: () => React.ReactNode) => <LocationProvider>{storyFn()}</LocationProvider>,
  ],
};

export const Default = () => (
  <ChangeServerSeedConfirmationModal show={true} confirmPath="/" cancelPath="/" />
);
