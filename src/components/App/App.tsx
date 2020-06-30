import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Router } from '@reach/router';
import HomePage from '../../pages/home';
import { useQuery } from '@apollo/react-hooks';
import { useStateValue } from '../../state';
import { ME } from '../../graphql/queries';

const App: React.SFC = () => {
  const [{ auth }, dispatch] = useStateValue();
  const { data, error } = useQuery(ME);

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SIGN_IN', payload: { data: { user: { ...data.me } } } });
    }

    if (error) {
      dispatch({ type: 'SIGN_OUT' });
    }
  }, [dispatch, data, error]);

  return auth.state === 'UNKNOWN' ? (
    <div>Just a moment</div>
  ) : (
    <Layout>
      <Router>
        <HomePage path="/" />
      </Router>
    </Layout>
  );
};

export default App;
