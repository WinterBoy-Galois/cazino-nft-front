import { Redirect, RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import { useStateValue } from '../../state';
import Layout from '../Layout/Layout';

interface IProps extends RouteComponentProps {
  component: any;
  isAuthNeeded?: boolean;
}

const LayoutPage: React.FC<IProps> = ({ component: Component, isAuthNeeded, ...props }) => {
  const [, dispatch] = useStateValue();
  const [
    {
      auth: { state },
    },
  ] = useStateValue();

  useEffect(() => {
    dispatch({ type: 'CHAT_BOT_SHOW', payload: true });
  }, []);

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
