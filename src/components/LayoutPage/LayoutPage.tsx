import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';
import { useStateValue } from '../../state';
import Layout from '../Layout/Layout';

interface IProps extends RouteComponentProps {
  component: any;
  isAuthNeeded?: boolean;
}

const LayoutPage: React.FC<IProps> = ({ component: Component, isAuthNeeded, ...props }) => {
  const [
    {
      auth: { state },
    },
  ] = useStateValue();

  if (isAuthNeeded) {
    return (
      <Layout>
        {state === 'SIGNED_IN' ? (
          <Component {...props} />
        ) : (
          <Redirect to={'/?dialog=sign-in'} noThrow />
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export default LayoutPage;
