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


function App() {

  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState<object>({})
  const [cookies, setCookie, removeCookie] = useCookies(['jwt', "firstName", "lastName", "googleId", 'permissions', 'credential', 'photo']);
  const [loginLoading, setLoginLoading] = useState(true)

  useEffect(() => {
    // if credential saved in cookies, load so user doesnt have to sign in again 
    console.log("HOOOKIE?")
    if (Object.keys(cookies).includes("credential")) {
      handleCredential(cookies["credential"])
    }else{
      setLoginLoading(false)
    }
  }, []);

  const handleCredential = (credential) => {
    if (credential) {
      console.log(cookies["jwt"])
      checkUser({
        token: credential
      }, cookies["jwt"]).then(backendRes => {
        try {
          setLoginLoading(false)
          if (backendRes["data"]["Success"]) {
            var idinfo = jwtDecode(credential)
            setCookie("jwt", backendRes["data"].jwt, { path: "/" })
            setCookie('credential', credential, { path: "/" })
            setUser({
              email: idinfo["email"],
              googleId: idinfo["sub"],
              firstName: idinfo["given_name"],
              lastName: idinfo["family_name"],
              jwt: backendRes["data"].jwt,
              photo: idinfo["picture"],
              user_id: backendRes["data"]["user_id"]
            })
            // console.log({
            //   email: idinfo["email"],
            //   googleId: idinfo["sub"],
            //   firstName: idinfo["given_name"],
            //   lastName: idinfo["family_name"],
            //   jwt: backendRes["data"].jwt,
            //   photo: idinfo["picture"],
            //   user_id: backendRes["data"]["user_id"]
            // })
            setIsSignedIn(true)
          }
        }
        catch {
          setIsSignedIn(false)
          setUser({})
        }
      })
    }

  }
  
  const handleSignOut = () => {
    console.log("SIGN OUT")
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
            isSignedIn={isSignedIn}
            user={user}
            loginLoading={loginLoading}
          ></Main>
        </div>
      </ThemeProvider>
    </GoogleOAuthProvider>

  );
}

export default App;

