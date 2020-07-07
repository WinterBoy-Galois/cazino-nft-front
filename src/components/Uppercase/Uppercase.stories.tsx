import React, { Fragment } from 'react';
import { text } from '@storybook/addon-knobs';
import Link from '../Link';

import Uppercase from '.';

export default {
  title: 'Components/Uppercase',
  component: Uppercase,
};

const data = {
  text: 'Hello World!',
  linkText: 'Link',
};

export const Default = () => <Uppercase>{text('Text', data.text)}</Uppercase>;
export const TextAndLink = () => (
  <Uppercase>
    <Fragment>
      {text('Text', data.text)}
      &nbsp;
      <Link href="#">{text('Linktext', data.linkText)}</Link>
    </Fragment>
  </Uppercase>
);
