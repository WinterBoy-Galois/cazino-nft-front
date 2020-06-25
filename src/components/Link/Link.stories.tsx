import React from 'react';
import { storiesOf } from '@storybook/react';
import Link from '.';
import { withKnobs, text } from '@storybook/addon-knobs';

storiesOf('Components/Link', module)
  .addDecorator(withKnobs)
  .add('default', () => <Link href={text('Href', '/')}>{text('Text', 'Link')}</Link>);
