import { Redirect, RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import { useStateValue } from '../../state';
import Layout from '../Layout/Layout';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';
import { useUserState } from '../../user/UserProvider';

interface IProps extends RouteComponentProps {
  component: any;
  isAuthNeeded?: boolean;
}

const LayoutPage: React.FC<IProps> = ({ component: Component, isAuthNeeded, ...props }) => {
  const isAuthorized = useIsAuthorized();
  const [
    {
      sidebar: { isChatBot },
    },
    dispatch,
  ] = useStateValue();

  const [{ showLoginModal }] = useUserState();

  useEffect(() => {
    if (!isChatBot) {
      dispatch({ type: 'CHAT_BOT_SHOW', payload: true });
    }
  }, []);

  if (isAuthNeeded) {
    return (
      <Layout>
        {isAuthorized && !showLoginModal ? <Component {...props} /> : <Redirect to={`/`} noThrow />}
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
