import React from 'react';
import { storiesOf } from '@storybook/react';
import Modal from '.';

storiesOf('Components/Modal', module).add('default', () => (
  <Modal show={true} title="Modal Title">
    Hi, I'm a Modal!
  </Modal>
));
