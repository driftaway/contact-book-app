import React from 'react';
import { GlobalContextProvider } from './context/globalContext';
import Home from './components/Home';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
