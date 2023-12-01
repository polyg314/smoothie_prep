import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewSmoothieOrder } from "./pages/NewSmoothieOrder";
import Layout from './Layout';

function Main(props: any) {

    return (
        <Layout
            handleSignOut={props.handleSignOut}
            handleCredential={props.handleCredential}
            isSignedIn={props.isSignedIn}
            user={props.user}
            loginLoading={props.loginLoading}

        >
            <>

                <Router>
                    <Routes>
                        <Route path="/" element={<NewSmoothieOrder />} />
                    </Routes>
                </Router>

            </>
        </Layout>
    )
}

export default Main;