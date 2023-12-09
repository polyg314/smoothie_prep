import { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme'; // Adjust the import path according to where you place the theme.ts file
import Main from './Main';
import { jwtDecode } from "jwt-decode";
import checkUser from './API/checkUser';
import { useCookies } from "react-cookie";
import { googleLogout } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider, emptyUser, useUser } from './contexts/userContext';


function App() {





  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Main
            ></Main>
          </div>
        </ThemeProvider>
      </UserProvider>
    </GoogleOAuthProvider>

  );
}

export default App;

