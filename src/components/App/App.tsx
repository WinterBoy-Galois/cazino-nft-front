import React from 'react';
import Layout from '../Layout/Layout';
import { Router } from '@reach/router';
import HomePage from '../../pages/home';
import { StateProvider } from '../../state';

const App: React.SFC = () => {
  return (
    <StateProvider>
      <Layout>
        <Router>
          <HomePage path="/" />
        </Router>
      </Layout>
    </StateProvider>
  );
};

export default App;
