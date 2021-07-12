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
      newAuth: { state, relogin },
      sidebar: { isChatBot },
    },
  ] = useStateValue();

  useEffect(() => {
    if (!isChatBot) {
      dispatch({ type: 'CHAT_BOT_SHOW', payload: true });
    }
  }, []);

  const isLoggined = state === 'SIGNED_IN';

  if (isAuthNeeded) {
    return (
      <Layout>
        {isLoggined ? (
          <Component {...props} />
        ) : relogin ? (
          <div>skeleton</div>
        ) : (
          <Redirect to={`/`} noThrow />
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
