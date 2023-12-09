import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewSmoothieOrder } from "./pages/NewSmoothieOrder";
import Layout from './Layout';
import { SmoothieData } from './pages/SmoothieData';

import { jwtDecode } from "jwt-decode";
import checkUser from './API/checkUser';
import { useCookies } from "react-cookie";
import { googleLogout } from '@react-oauth/google';
import { emptyUser, useUser } from './contexts/userContext';
import { useEffect, useState } from 'react';

function Main(props: any) {

    const [isSignedIn, setIsSignedIn] = useState(false)
    const { user, updateUser } = useUser();

    const [cookies, setCookie, removeCookie] = useCookies(['jwt', "firstName", "lastName", "googleId", 'credential', 'photo']);
    const [loginLoading, setLoginLoading] = useState(true)

    useEffect(() => {
        // if credential saved in cookies, load so user doesnt have to sign in again 
        if (Object.keys(cookies).includes("credential")) {
            handleCredential(cookies["credential"])
        } else {
            setLoginLoading(false)
        }
    }, []);

    const handleCredential = (credential) => {
        if (credential) {
            checkUser({
                token: credential
            }, cookies["jwt"]).then(backendRes => {
                try {
                    setLoginLoading(false)
                    if (backendRes["data"]["Success"]) {
                        var idinfo = jwtDecode(credential)
                        setCookie("jwt", backendRes["data"].jwt, { path: "/" })
                        setCookie('credential', credential, { path: "/" })
                        console.log("UPPPP")
                        updateUser({
                            email: idinfo["email"],
                            googleId: idinfo["sub"],
                            firstName: idinfo["given_name"],
                            lastName: idinfo["family_name"],
                            jwt: backendRes["data"].jwt,
                            photo: idinfo["picture"],
                            user_id: backendRes["data"]["user_id"]
                        })
                        setIsSignedIn(true)
                    }
                }
                catch {
                    setIsSignedIn(false)
                    updateUser(emptyUser)
                }
            })
        } else {
            setLoginLoading(false)
        }

    }

    const handleSignOut = () => {
        console.log("SIGN OUT")
        updateUser(emptyUser)
        setIsSignedIn(false)
        setCookie("jwt", '', { path: "/" })
        setCookie('credential', '', { path: "/" })
        googleLogout()

    }


    // console.log(JSON.parse(process.env.REACT_APP_LEADERSHIP))

    // const { user  } = useUser();

    return (
        <Router>

            <Layout
                handleSignOut={handleSignOut}
                handleCredential={handleCredential}
                isSignedIn={isSignedIn}
                loginLoading={loginLoading}

            >
                <>

                    {/* <Router> */}
                    <Routes>
                        <Route path="/" element={<NewSmoothieOrder />} />
                    </Routes>
                    {/* </Router> */}
                    {/* {user.email &&  */}
                    <>
                        {user &&
                            <>

                                {JSON.parse(process.env.REACT_APP_LEADERSHIP).includes(user.email) &&
                                    <Routes>
                                        <Route path="/smoothie-data" element={<SmoothieData />} />
                                    </Routes>

                                }
                            </>

                        }

                    </>




                </>
            </Layout>
        </Router>
    )
}

export default Main;