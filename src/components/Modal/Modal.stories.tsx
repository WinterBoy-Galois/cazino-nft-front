import React from 'react';
import { storiesOf } from '@storybook/react';
import Modal from '.';

const LargeText = () => (
  <div>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
    sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
    justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
    ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
    et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
    est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
    esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
    iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
    nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
    quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
    consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
    consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio
    dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla
    facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id
    quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing
    elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
    wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
    aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
    esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. At vero eos et accusam et
    justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
    ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
    et accusam et justo duo dolores et ea rebum.
  </div>
);

storiesOf('Components/Modal', module)
  .add('default', () => (
    <Modal show={true} title="Modal Title">
      Hi, I&apos;m a Modal!
    </Modal>
  ))
  .add('scroll', () => (
    <Modal show={true} title="Modal Title">
      Hi, I&apos;m a Modal! <br />
      <LargeText />
    </Modal>
  ))
  .add('with footer', () => (
    <Modal show={true} title="Modal Title" footer={<div>Footer</div>}>
      Hi, I&apos;m a Modal! <br />
      <LargeText />
    </Modal>
  ));
