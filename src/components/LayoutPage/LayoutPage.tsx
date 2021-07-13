import { Redirect, RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import { useStateValue } from '../../state';
import Layout from '../Layout/Layout';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';

interface IProps extends RouteComponentProps {
  component: any;
  isAuthNeeded?: boolean;
}

const LayoutPage: React.FC<IProps> = ({ component: Component, isAuthNeeded, ...props }) => {
  const isAuthorized = useIsAuthorized();
  const [, dispatch] = useStateValue();
  const [
    {
      newAuth: { relogin },
      sidebar: { isChatBot },
    },
  ] = useStateValue();

  useEffect(() => {
    if (!isChatBot) {
      dispatch({ type: 'CHAT_BOT_SHOW', payload: true });
    }
  }, []);

  if (isAuthNeeded) {
    return (
      <Layout>
        {isAuthorized ? (
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
