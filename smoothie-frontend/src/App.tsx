import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme'; // Adjust the import path according to where you place the theme.ts file
import { Button } from '@mui/material';
import Main from './Main';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
         <Main></Main>
      </div>
    </ThemeProvider>
  );
}

export default App;

