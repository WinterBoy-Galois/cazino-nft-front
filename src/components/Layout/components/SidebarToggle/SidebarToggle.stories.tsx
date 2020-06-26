import React from 'react';
import { storiesOf } from '@storybook/react';
import SidebarToggle from '.';

storiesOf('Components/SidebarToggle', module).add('default', () => <SidebarToggle show={true} />);
