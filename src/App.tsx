import React from 'react';
import { GlobalContextProvider } from './context/globalContext';
import Home from './pages/Home';

const App = () => {
  return (
    <GlobalContextProvider>
      <Home />
    </GlobalContextProvider>
  );
}

export default App;
