import React from 'react';
import Layout from '../Layout/Layout';
import { Router } from '@reach/router';
import HomePage from '../../pages/home';

const App: React.SFC = () => {
  return (
    <Layout>
      <Router>
        <HomePage path="/" />
      </Router>
    </Layout>
  );
};

export default App;
