import React from 'react';
import { storiesOf } from '@storybook/react';
import DetailsContainer from '.';

storiesOf('Components/DetailsContainer', module)
  .addDecorator(storyFn => (
    <div style={{ padding: '3rem', backgroundColor: '#2d4560', height: '100vh' }}>{storyFn()}</div>
  ))
  .add('default', () => (
    <DetailsContainer>
      Details Container <br />
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam
    </DetailsContainer>
  ));
