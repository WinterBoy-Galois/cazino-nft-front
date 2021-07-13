import { Redirect, RouteComponentProps } from '@reach/router';
import React from 'react';
import { useStateValue } from '../../state';

interface IProps extends RouteComponentProps {
  component: any;
}

const AuthRoute: React.FC<IProps> = ({ component: Component, ...props }) => {
  const [
    {
      auth: { state },
    },
  ] = useStateValue();

  return state === 'SIGNED_IN' ? (
    <Component {...props} />
  ) : (
    <Redirect to={'/?dialog=sign-in'} noThrow />
  );
};

export default AuthRoute;
