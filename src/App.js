import React from 'react';

import GlobalStyle from './styled/Global';
import Layout from './components/Layout';
import Routes from './components/navigation/Routes';

const App = () => (
  <>
    <GlobalStyle />
    <Layout>
      <Routes />
    </Layout>
  </>
);

export default App;
