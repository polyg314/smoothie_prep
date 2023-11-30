import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme'; // Adjust the import path according to where you place the theme.ts file
import { Button } from '@mui/material';
import Main from './Main';

import { jwtDecode } from "jwt-decode";
import checkUser from './API/checkUser';
import { useCookies } from "react-cookie";

import { googleLogout } from '@react-oauth/google';

import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<object>({})
  const [cookies, setCookie, removeCookie] = useCookies(['jwt', "firstName", "lastName", "googleId", 'permissions', 'credential', 'photo']);


  const handleCredential = (credential) => {
    console.log("HIHIHI")
    console.log(process.env.REACT_APP_CLIENT_ID)
    // console.log(jwtDecode(credential))dddddddd
    if(credential){
      console.log(jwtDecode(credential))
    }
    checkUser({
      token: credential
    }, cookies["jwt"]).then(backendRes => {
      try {
        if (backendRes["data"]["Success"]) {
          var idinfo = jwtDecode(credential)
          console.log("ID INFO")
          console.log(idinfo)
          setCookie("jwt", backendRes["data"].jwt, { path: "/" })
          // MAIN - REAL Set up 
          setUser({
            email: idinfo["email"],
            name: idinfo["given_name"] + " " + idinfo["family_name"],
            googleId: idinfo["sub"],
            firstName: idinfo["given_name"],
            lastName: idinfo["family_name"],
            permissions: backendRes["data"].permissions,
            jwt: backendRes["data"].jwt,
            photo: idinfo["picture"],
            functional_team: backendRes["data"].functional_team,
            location_country: backendRes["data"].location_country
          })

          setIsSignedIn(true)

        } else {

        }

      }
      catch {

      }
    })
  }
  useEffect(() => {
    handleCredential(cookies["credential"])


  }, []);

  const handleSignOut = () => {
    setUser({})
    setIsSignedIn(false)
    setCookie("jwt", '', { path: "/" })
    setCookie('credential', '', { path: "/" })
    googleLogout()
  }




  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>

    <ThemeProvider theme={theme}>

      <div className="App">
         <Main
            handleSignOut={handleSignOut}
            handleCredential={handleCredential}
         ></Main>
      </div>
    </ThemeProvider>
    </GoogleOAuthProvider>

  );
}

export default App;

