import React from 'react';

import AccountActivationModal from '.';

export default {
  title: 'Components/AccountActivationModal',
  component: AccountActivationModal,
};

const data = {
  show: true,
  loading: false,
};

export const Default = () => <AccountActivationModal show={data.show} loading={data.loading} />;
